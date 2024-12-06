function generateCaptcha() {
  const canvas = document.getElementById('captchaCanvas');
  const ctx = canvas.getContext('2d');

  // Caracteres possíveis, incluindo letras com acentuação
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captchaText = '';
  for (let i = 0; i < 6; i++) {
    captchaText += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  // Armazenar o CAPTCHA para verificação
  canvas.dataset.captcha = captchaText;

  // Estilo do CAPTCHA
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '30px Arial';
  ctx.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
  ctx.fillText(captchaText, 30, 50);

  // Adicionar ruído
  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`;
    ctx.stroke();
  }
}

function verifyCaptcha() {
  const userCaptcha = document.getElementById('captchaInput').value;
  const canvas = document.getElementById('captchaCanvas');
  const generatedCaptcha = canvas.dataset.captcha;

  const resultMessage = document.getElementById('resultMessage');
  if (userCaptcha === generatedCaptcha) {
    resultMessage.style.color = 'green';
    resultMessage.textContent = 'Você acertou o CAPTCHA!';
  } else {
    resultMessage.style.color = 'red';
    resultMessage.textContent = 'Você errou o CAPTCHA. Tente novamente.';
  }
}

document.getElementById('refreshCaptcha').addEventListener('click', generateCaptcha);
document.getElementById('submitCaptcha').addEventListener('click', verifyCaptcha);

// Gerar o CAPTCHA na inicialização
generateCaptcha();
