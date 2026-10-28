"""
Procura por documentos mais relevantes em `embeddings_index.json` usando similaridade cosseno.
Uso:
  pip install numpy
  python tools/search_docs.py "seu texto de busca"

Retorna os top-k documentos e seus paths.
"""
import sys
import json
import math
from pathlib import Path

IN = Path('embeddings_index.json')


def dot(a,b):
    return sum(x*y for x,y in zip(a,b))

def norm(a):
    return math.sqrt(sum(x*x for x in a))


def cosine(a,b):
    return dot(a,b)/(norm(a)*norm(b)+1e-10)


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Uso: python tools/search_docs.py "sua consulta"')
        sys.exit(1)
    q = sys.argv[1]
    if not IN.exists():
        print('Arquivo embeddings_index.json não encontrado. Rode embed_index.py primeiro.')
        sys.exit(1)
    data = json.loads(IN.read_text())
    # pedir embeddings via OpenAI
    try:
        import openai
    except Exception:
        print('Instale openai: pip install openai')
        sys.exit(1)
    key = None
    import os
    key = os.environ.get('OPENAI_API_KEY')
    if not key:
        print('Defina OPENAI_API_KEY no ambiente para gerar embedding da consulta.')
        sys.exit(1)
    openai.api_key = key
    resp = openai.Embedding.create(input=q, model='text-embedding-3-small')
    q_emb = resp['data'][0]['embedding']
    scores = []
    for d in data:
        s = cosine(q_emb, d['embedding'])
        scores.append((s, d))
    scores.sort(key=lambda x: x[0], reverse=True)
    for score, doc in scores[:10]:
        print(f"{score:.4f} - {doc['path']}")
        print(doc['text'][:400].replace('\n',' ')+'...')
        print('---')
