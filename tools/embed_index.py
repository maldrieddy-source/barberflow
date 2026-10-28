"""
Pequeno script para indexar arquivos do workspace em embeddings usando OpenAI.
Uso:
  pip install openai tiktoken
  export OPENAI_API_KEY="sua_chave"
  python tools/embed_index.py

O script salva `embeddings_index.json` com lista de documentos: {id, path, text, embedding}
"""
import os
import json
from pathlib import Path

try:
    import openai
except Exception:
    print('Instale a biblioteca openai: pip install openai')
    raise

OPENAI_MODEL = 'text-embedding-3-small'
ROOT = Path('.')
IGNORE = {'.git', 'node_modules', '__pycache__'}
OUT = Path('embeddings_index.json')


def iter_files(root):
    for p in root.rglob('*'):
        if any(part in IGNORE for part in p.parts):
            continue
        if p.is_file() and p.suffix.lower() in {'.md', '.txt', '.html', '.js', '.css', '.py'}:
            yield p


def chunk_text(text, size=1000):
    # simples chunk por caracteres
    for i in range(0, len(text), size):
        yield text[i:i+size]


def main():
    key = os.environ.get('OPENAI_API_KEY')
    if not key:
        print('Defina OPENAI_API_KEY no ambiente.')
        return
    openai.api_key = key

    docs = []
    for f in iter_files(ROOT):
        text = f.read_text(errors='ignore')
        for i, chunk in enumerate(chunk_text(text, 1200)):
            doc = {
                'id': f'{f.as_posix()}::{i}',
                'path': f.as_posix(),
                'text': chunk,
            }
            docs.append(doc)

    print(f'Gerando embeddings para {len(docs)} chunks...')
    for d in docs:
        resp = openai.Embedding.create(input=d['text'], model=OPENAI_MODEL)
        d['embedding'] = resp['data'][0]['embedding']

    OUT.write_text(json.dumps(docs, ensure_ascii=False))
    print('Salvo em', OUT)


if __name__ == '__main__':
    main()
