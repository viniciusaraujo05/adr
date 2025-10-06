# Página Secreta - Agente do Reino

## 🎯 Descrição
Uma página temática de agência secreta com efeitos Matrix, contagem regressiva de 10 segundos e mensagem inspiradora com versículo bíblico.

## 🚀 Como Acessar
Esta é a página inicial do site! Acesse diretamente:
```
http://seu-dominio.com/
```

**Sem necessidade de login ou registro** - a página é pública e acessível a todos.

## ✨ Características

### Ecrã de Carregamento (10 segundos)
- Contagem regressiva de 10 a 0
- Efeito Matrix com números e caracteres japoneses a cair
- Mensagem: "A CARREGAR A TUA MISSÃO" (fonte tipo terminal)
- Barra de progresso animada
- Mensagens de sistema a simular carregamento de dados secretos (em PT-PT)

### Ecrã de Sucesso
- Badge/escudo de agente
- Mensagem: "PARABÉNS AGORA ÉS UM AGENTE DO REINO" (fonte tipo terminal)
- **Mensagem especial: "⚠️ A TUA MISSÃO NÃO É SECRETA - DIVULGA A TODOS!"**
- Versículo bíblico: Mateus 28:19-20 (A Grande Comissão)
- Efeitos visuais de scanlines
- Decorações de canto: "CLASSIFICADO", "ULTRA SECRETO", "LIGAÇÃO SEGURA", "ENCRIPTADO"

## 🎨 Efeitos Visuais
- **Matrix Rain**: Caracteres caindo continuamente no fundo
- **Scanlines**: Linhas de varredura animadas
- **Glow Effects**: Brilho verde neon nos textos principais
- **Fade In**: Animações suaves de entrada
- **Pulse**: Pulsação no contador

## 🛠️ Tecnologias
- React + TypeScript
- Inertia.js
- TailwindCSS
- Animações CSS customizadas

## 📝 Personalização
Para alterar o versículo bíblico, edite o arquivo:
```
/var/www/html/adr/resources/js/pages/secret-mission.tsx
```

Procure pela seção "Bible Verse" (linha ~126) e substitua o texto e a referência.
