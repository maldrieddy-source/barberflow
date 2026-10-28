Guia rápido: Fine-tune / LoRA (visão geral)

1) Preparar dados
- Colete exemplos pares (input, output) em JSONL: cada linha {"prompt": "...", "completion": "..."}
- Limpe e normalize texto; remover dados sensíveis.

2) Fine-tune pela API (OpenAI exemplo)
- Requisitos: chave API, permissão para fine-tune.
- Comando (exemplo):

  openai api fine_tunes.create -t my_data_prepared.jsonl -m ada

- Depois aguarde o job e use o modelo resultante.

3) Usar LoRA em modelos open-source
- Configure ambiente com `pip install peft transformers bitsandbytes accelerate`.
- Converta dados para formato de treino e rode script de LoRA (ex: `train_lora.py` com HuggingFace).

4) Avaliação e iteração
- Avalie em conjunto de validação; cheque alucinações e viés.
- Refaça curadoria e repita.

5) Considerações práticas
- Fine-tuning costuma ter custo; LoRA é mais barato e rápido.
- Proteja dados sensíveis (exclua antes de treinar).

Se quiser, eu posso gerar um `train_lora.py` de exemplo ou preparar um pipeline de coleta de exemplos a partir dos prompts que você já usou no projeto. Diga se prefere `train_lora.py` ou preparação de dados.
