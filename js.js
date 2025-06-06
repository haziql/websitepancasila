document.addEventListener('DOMContentLoaded', () => {
    const typingEl = document.querySelector('.typing');

    const text =  `Halooo Semuanya👋, 
Di era digital yang serba cepat, nilai-nilai Pancasila tetap relevan dan penting. Melalui edukasi dan aksi nyata, mari kita jaga bersama jati diri bangsa.`;

    let i = 0;
    let speed = 20;
    function typing() {
    if (i < text.length) {
        if(text[i] === '\n'){
            typingEl.innerHTML += '<br>';
        } else {
            typingEl.innerHTML += text[i];
        }
        i++;
        setTimeout(typing, speed);
    }
    }
    typing();
});
function welcomeUser() {     
    alert("Selamat datang!");
    window.location.href = "index2.html";
}
function back(){
    window.location.href = "index2.html";
}
function back2(){
    window.location.href = "index2.html";
}
function message(){
    window.location.href = "mailto:haziqalfareza11@gmail.com";
}

(() => {
"use strict";
const questions = [
    {
    question: "Apa arti penting Pancasila di era digital?",
    answers: [
        "Dasar negara dan panduan nilai hidup bangsa, yang harus diterapkan adaptif di era digital",
        "Hanya simbol tanpa relevansi praktis sekarang",
        "Pengganti semua hukum digital",
        "Hanya dokumen sejarah tanpa pengaruh"
    ],
    correctIndex: 0
    },
    {
    question: "Apa salah satu dampak globalisasi terhadap nilai Pancasila?",
    answers: [
        "Meningkatkan kesadaran Pancasila di seluruh dunia",
        "Mempermudah pemahaman nilai secara langsung tanpa media",
        "Pengaruh budaya asing yang dapat menggeser pemahaman nilai asli bangsa",
        "Menghapus nilai Pancasila secara sah"
    ],
    correctIndex: 2
    },
    {
    question: "Strategi apa yang efektif untuk meningkatkan pendidikan karakter Pancasila?",
    answers: [
        "Mengabaikan ajaran Pancasila dan fokus teknologi",
        "Mengintegrasikan nilai Pancasila secara nyata dalam kegiatan sekolah dan digital",
        "Mengharuskan siswa menulis ulang Pancasila setiap hari tanpa aplikasi praktis",
        "Membatasi akses internet di sekolah"
    ],
    correctIndex: 1
    },
    {
    question: "Bagaimana media digital mempengaruhi problematika kesadaran Pancasila?",
    answers: [
        "Membuat seluruh masyarakat lebih sadar Pancasila tanpa hambatan",
        "Menjadi sumber informasi yang dapat memperkuat atau melemahkan pemahaman nilai sesuai konten yang disajikan",
        "Tidak berpengaruh sama sekali",
        "Menyebarkan nilai Pancasila secara otomatis tanpa usaha"
    ],
    correctIndex: 1
    },
    {
    question: "Apa contoh aksi masyarakat dalam menjaga nilai Pancasila menggunakan platform digital?",
    answers: [
        "Menggunakan media sosial untuk kampanye sosial yang mendukung nilai Pancasila",
        "Menyebarkan hoaks dan berita palsu tanpa verifikasi",
        "Menghindari penggunaan teknologi agar tidak kehilangan nilai Pancasila",
        "Menggunakan internet cuma untuk hiburan"
      ],
      correctIndex: 0
    }
  ];

  const questionNumberEl = document.getElementById('question-number');
  const questionTextEl = document.getElementById('question-text');
  const answersEl = document.getElementById('answers');
  const btnNext = document.getElementById('btn-next');
  const resultSection = document.getElementById('result');
  const quizSection = document.getElementById('quiz');
  const scoreText = document.getElementById('score-text');
  const btnRestart = document.getElementById('btn-restart');
  const introText = document.getElementById('quiz-intro');

  let currentQuestionIndex = 0;
  let selectedAnswerIndex = null;
  let score = 0;
  let answeredConfirmed = false;

  function clearAnswers() {
    answersEl.innerHTML = '';
    selectedAnswerIndex = null;
    answeredConfirmed = false;
    btnNext.disabled = true;
    btnNext.setAttribute('aria-disabled', 'true');
  }

  function renderQuestion(index) {
    clearAnswers();
    introText.style.display = 'block';
    btnNext.textContent = 'Pertanyaan Berikutnya';
    const q = questions[index];
    questionNumberEl.textContent = `Pertanyaan ${index + 1} dari ${questions.length}`;
    questionTextEl.textContent = q.question;
    q.answers.forEach((answer, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'answer-btn';
      btn.textContent = answer;
      btn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('aria-label', `Jawaban ${i + 1}: ${answer}`);
      btn.disabled = false;
      btn.addEventListener('click', () => {
        if (answeredConfirmed) return; // tidak bisa ganti jawaban saat sudah confirm (next ditekan)
        if (selectedAnswerIndex !== i) {
          // Hapus semua kelas selected dulu
          Array.from(answersEl.children).forEach(b => {
            b.classList.remove('selected');
            b.setAttribute('aria-pressed', 'false');
          });
          // Beri tanda selected pada yang dipilih
          btn.classList.add('selected');
          btn.setAttribute('aria-pressed', 'true');
          selectedAnswerIndex = i;
          btnNext.disabled = false;
          btnNext.setAttribute('aria-disabled', 'false');
        }
      });
      answersEl.appendChild(btn);
    });
  }

  function showAnswerFeedback(selected, correct) {
    const answerButtons = answersEl.children;
    for (let i = 0; i < answerButtons.length; i++) {
      answerButtons[i].disabled = true;
      if (i === correct) {
        answerButtons[i].classList.add('correct');
      }
      if (i === selected && i !== correct) {
        answerButtons[i].classList.add('incorrect');
      }
    }
  }

  function showResult() {
    quizSection.hidden = true;
    resultSection.hidden = false;
    introText.style.display = 'none';
    scoreText.textContent = `Anda menjawab dengan benar ${score} dari ${questions.length} pertanyaan. `;
    if (score === questions.length) {
      scoreText.textContent += "Luar biasa! Anda benar-benar mengerti nilai Pancasila.";
    } else if (score >= questions.length / 2) {
      scoreText.textContent += "Bagus! Anda telah memahami sebagian besar nilai Pancasila.";
    } else {
      scoreText.textContent += "Perlu belajar lebih banyak lagi untuk menjaga nilai-nilai Pancasila.";
    }
    resultSection.focus();
  }

  function resetQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    quizSection.hidden = false;
    resultSection.hidden = true;
    renderQuestion(currentQuestionIndex);
    quizSection.focus();
}

btnNext.addEventListener('click', () => {
    if (selectedAnswerIndex === null || answeredConfirmed) {
    return;
    }

    if (selectedAnswerIndex === questions[currentQuestionIndex].correctIndex) {
        score++;
    }
        showAnswerFeedback(selectedAnswerIndex, questions[currentQuestionIndex].correctIndex);
        answeredConfirmed = true;

    if (currentQuestionIndex === questions.length -1) {
        btnNext.textContent = 'Selesai';
        } else {
        btnNext.textContent = 'Lanjutkan';
        }
});

btnNext.addEventListener('dblclick', () => {
});

btnNext.addEventListener('keydown', e => {
    if ((e.key === "Enter" || e.key === " ") && !btnNext.disabled) {
        e.preventDefault();
        btnNext.click();
}
});

btnNext.addEventListener('click', () => {
    if (!answeredConfirmed) {
    return;
    }
    currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            renderQuestion(currentQuestionIndex);
        }else {
            showResult();
    }
});

btnRestart.addEventListener('click', () => {
    resetQuiz();
});

renderQuestion(currentQuestionIndex);
})();
