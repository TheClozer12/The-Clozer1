document.addEventListener('DOMContentLoaded', () => {
    // ==================== DATA ====================
    const questions = [
        {
            text: '친구가 갑자기 전화해서\n고민 상담을 시작했어. 넌?',
            emoji: '📞',
            options: [
                { emoji: '😌', text: '일단 끝까지 들어본다', type: '경청형' },
                { emoji: '💡', text: '바로 해결책을 제시한다', type: '주도형' }
            ]
        },
        {
            text: '단톡방에서 의견이 갈렸어. 넌?',
            emoji: '💬',
            options: [
                { emoji: '🤝', text: '분위기 보면서 중립을 지킨다', type: '조율형' },
                { emoji: '✊', text: '내 의견을 확실하게 말한다', type: '주도형' }
            ]
        },
        {
            text: '처음 만난 사람과\n어색한 침묵이 흘러. 넌?',
            emoji: '🫣',
            options: [
                { emoji: '🗣️', text: '먼저 가벼운 질문을 던진다', type: '주도형' },
                { emoji: '😶', text: '상대가 말할 때까지 기다린다', type: '경청형' }
            ]
        },
        {
            text: '친구가 "나 요즘 힘들어"\n라고 말했어. 넌?',
            emoji: '😢',
            options: [
                { emoji: '🥺', text: '"무슨 일이야?" 하고 더 물어본다', type: '공감형' },
                { emoji: '💪', text: '"다 잘 될 거야!" 하고 힘을 준다', type: '분위기형' }
            ]
        },
        {
            text: '회의 중 내 아이디어에\n반대 의견이 나왔어. 넌?',
            emoji: '🏢',
            options: [
                { emoji: '👍', text: '상대 의견의 좋은 점을 먼저 인정한다', type: '조율형' },
                { emoji: '📊', text: '내 아이디어의 근거를 다시 설명한다', type: '논리형' }
            ]
        },
        {
            text: '대화 중 상대방이\n팩트가 틀린 말을 했어. 넌?',
            emoji: '🤨',
            options: [
                { emoji: '🧐', text: '부드럽게 정정해준다', type: '논리형' },
                { emoji: '😊', text: '굳이 지적 안 하고 넘어간다', type: '공감형' }
            ]
        },
        {
            text: '친구 5명이랑\n여행 계획을 짜고 있어. 넌?',
            emoji: '✈️',
            options: [
                { emoji: '📋', text: '내가 주도해서 일정을 짠다', type: '주도형' },
                { emoji: '📝', text: '다른 사람 의견을 모아서 정리한다', type: '조율형' }
            ]
        },
        {
            text: '누군가 나에게\n진심 어린 칭찬을 해줬어. 넌?',
            emoji: '🥹',
            options: [
                { emoji: '🥰', text: '고맙다고 하면서 상대도 칭찬해준다', type: '공감형' },
                { emoji: '😂', text: '좀 쑥스러워서 농담으로 넘긴다', type: '분위기형' }
            ]
        },
        {
            text: '오랜만에 만난 친구가\n자기 얘기만 계속해. 넌?',
            emoji: '🗣️',
            options: [
                { emoji: '👂', text: '잘 들어주다가 자연스럽게 내 얘기도 꺼낸다', type: '경청형' },
                { emoji: '😆', text: '"야 내 얘기도 좀 들어봐!" 하고 끼어든다', type: '분위기형' }
            ]
        },
        {
            text: '중요한 대화 직전,\n넌 어떻게 준비해?',
            emoji: '🎯',
            options: [
                { emoji: '🧠', text: '머릿속으로 할 말을 미리 정리한다', type: '논리형' },
                { emoji: '🎤', text: '그때그때 분위기 보고 말한다', type: '분위기형' }
            ]
        }
    ];

    const typeData = {
        '주도형': {
            emoji: '🎯',
            name: '주도형',
            catchphrase: '"대화의 운전대를 잡는 사람"',
            desc: '넌 대화를 이끌어가는 타입이야. 모임에서 자연스럽게 리더 역할을 하고, 어색한 침묵은 네가 깨. 사람들은 네가 있으면 대화가 술술 풀린다고 느껴.',
            strengths: ['추진력 — 대화를 빠르게 진전시켜', '리더십 — 모임의 중심이 돼', '결단력 — 의견을 명확하게 전달해'],
            weaknesses: ['가끔 상대 말을 끊을 수 있어', '너무 주도하면 상대가 위축될 수 있어'],
            goodMatch: '경청형, 공감형',
            badMatch: '주도형끼리',
            closerCTA: '리드하면서도 상대가 편한 대화법, 연습해볼래?'
        },
        '경청형': {
            emoji: '👂',
            name: '경청형',
            catchphrase: '"듣는 것만으로 사람을 치유하는 사람"',
            desc: '넌 말보다 귀가 먼저인 사람이야. 사람들이 너한테 고민을 말하고 싶어하는 이유가 있어. 네 경청 하나로 상대방은 큰 위로를 받거든.',
            strengths: ['공감 능력 — 상대의 감정을 잘 읽어', '신뢰감 — 사람들이 너를 믿고 이야기해', '깊은 관계 — 진정한 유대를 만들어'],
            weaknesses: ['자기 의견을 잘 안 드러내', '때로 자신의 감정은 뒤로 미뤄'],
            goodMatch: '주도형, 분위기형',
            badMatch: '경청형끼리 (대화가 안 시작됨)',
            closerCTA: '잘 듣는 건 최고야. 거기에 표현력까지 더해볼래?'
        },
        '조율형': {
            emoji: '🤝',
            name: '조율형',
            catchphrase: '"갈등을 녹이는 중재자"',
            desc: '넌 사람들 사이에서 균형을 잡는 천재야. 싸우던 사람도 네 말 듣고 "그것도 맞네" 하게 만들어. 네 외교력은 천부적인 재능이야.',
            strengths: ['중재력 — 갈등 상황을 부드럽게 풀어', '균형감 — 다양한 시각을 존중해', '외교력 — 누구와도 잘 소통해'],
            weaknesses: ['자기 입장이 불분명해 보일 수 있어', '모두를 만족시키려다 지칠 수 있어'],
            goodMatch: '논리형, 주도형',
            badMatch: '분위기형 (진지한 대화가 어려움)',
            closerCTA: '중재도 좋지만, 네 의견도 확실히 전달하는 연습 해보자'
        },
        '논리형': {
            emoji: '💡',
            name: '논리형',
            catchphrase: '"팩트로 대화를 완성하는 사람"',
            desc: '넌 감정보다 논리가 먼저인 대화가야. 토론하면 무조건 네가 이겨. 복잡한 문제도 네가 정리하면 깔끔하게 풀려.',
            strengths: ['설득력 — 근거 있는 주장을 펼쳐', '명확한 전달 — 핵심을 잘 짚어', '문제해결 — 복잡한 상황을 정리해'],
            weaknesses: ['가끔 차갑게 느껴질 수 있어', '감정적 공감이 부족할 때가 있어'],
            goodMatch: '조율형, 공감형',
            badMatch: '논리형끼리 (토론이 끝나지 않음)',
            closerCTA: '논리에 공감까지 더하면 최강이야. 연습해볼래?'
        },
        '공감형': {
            emoji: '💛',
            name: '공감형',
            catchphrase: '"마음을 먼저 읽는 사람"',
            desc: '넌 상대방의 기분을 본능적으로 아는 사람이야. 네 한 마디에 사람들이 위로를 받아. 네 곁에 있으면 마음이 편해지는 사람이 바로 너야.',
            strengths: ['감성 지능 — 상대의 감정을 즉시 캐치해', '위로 — 진심이 담긴 말을 해', '깊은 유대 — 사람들과 깊은 관계를 만들어'],
            weaknesses: ['감정 소모가 클 수 있어', '타인의 감정에 너무 영향받을 때가 있어'],
            goodMatch: '논리형, 분위기형',
            badMatch: '주도형 (감정 무시 느낌)',
            closerCTA: '공감 능력 최고! 협상이나 면접에서도 써먹어볼래?'
        },
        '분위기형': {
            emoji: '🎉',
            name: '분위기형',
            catchphrase: '"어디서든 웃음을 만드는 사람"',
            desc: '넌 분위기 메이커야. 네가 있으면 모임이 200% 재밌어지고, 어색함이 사라져. 사람들이 너랑 있고 싶어하는 건 당연한 거야.',
            strengths: ['유머 — 어떤 상황도 즐겁게 만들어', '사교성 — 누구와도 금방 친해져', '에너지 — 주변에 긍정 에너지를 퍼뜨려'],
            weaknesses: ['진지한 대화를 피할 수 있어', '깊은 감정 표현이 어려울 때가 있어'],
            goodMatch: '경청형, 공감형',
            badMatch: '논리형 (유머가 안 통함)',
            closerCTA: '재밌는 건 천재적인데, 진지한 대화도 연습해보자'
        }
    };

    // ==================== TEACHABLE MACHINE CONFIG ====================
    // Teachable Machine 모델 URL (본인의 모델 URL로 교체하세요)
    const TM_MODEL_URL = 'https://teachablemachine.withgoogle.com/models/bxGGMwu9e/';

    // Teachable Machine 클래스 → 대화유형 매핑
    const tmClassMap = {
        '리더형': '주도형',
        '따뜻형': '공감형',
        '분석형': '논리형',
        '에너지형': '분위기형'
    };

    // ==================== STATE ====================
    let currentQ = 0;
    const answers = new Array(10).fill(null);
    let tmModel = null;

    // ==================== DOM ELEMENTS ====================
    const pages = {
        landing: document.getElementById('landing'),
        camera: document.getElementById('camera'),
        quiz: document.getElementById('quiz'),
        loading: document.getElementById('loading'),
        result: document.getElementById('result')
    };

    const startBtn = document.getElementById('start-btn');
    const cameraBtn = document.getElementById('camera-btn');
    const cameraBackBtn = document.getElementById('camera-back-btn');
    const captureBtn = document.getElementById('capture-btn');
    const cameraPredictions = document.getElementById('camera-predictions');
    const photoInput = document.getElementById('photo-input');
    const uploadPlaceholder = document.getElementById('upload-placeholder');
    const uploadPreview = document.getElementById('upload-preview');
    const previewImg = document.getElementById('preview-img');
    const changePhotoBtn = document.getElementById('change-photo-btn');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const questionText = document.getElementById('question-text');
    const optionsDiv = document.getElementById('options');
    const backBtn = document.getElementById('back-btn');
    const loadingText = document.getElementById('loading-text');
    const loadingBar = document.getElementById('loading-bar');
    const loadingEmoji = document.getElementById('loading-emoji');
    const resultContainer = document.getElementById('result-container');
    const participantCount = document.getElementById('participant-count');
    const themeToggle = document.getElementById('theme-toggle');
    const quizCharacter = document.getElementById('quiz-character');

    // ==================== THEME ====================
    const savedTheme = localStorage.getItem('talktype-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        themeToggle.textContent = isLight ? '☀️' : '🌙';
        localStorage.setItem('talktype-theme', isLight ? 'light' : 'dark');
    });

    // ==================== PARTICIPANT COUNT ====================
    const baseCount = 12847;
    const daysSinceBase = Math.floor((Date.now() - new Date('2025-02-14').getTime()) / 86400000);
    const totalCount = baseCount + Math.max(0, daysSinceBase * 73);
    participantCount.textContent = `${totalCount.toLocaleString()}명이 참여했어요`;

    // ==================== PAGE NAVIGATION ====================
    function showPage(pageId) {
        Object.values(pages).forEach(p => p.classList.remove('active'));
        pages[pageId].classList.add('active');
        window.scrollTo(0, 0);

        // Hide info sections when not on landing page
        const infoSections = document.querySelectorAll('.info-section');
        const footer = document.querySelector('.footer-sections');
        if (pageId === 'landing') {
            infoSections.forEach(s => s.style.display = '');
            if (footer) footer.style.display = '';
        } else {
            infoSections.forEach(s => s.style.display = 'none');
            if (footer) footer.style.display = 'none';
        }
    }

    // ==================== QUIZ LOGIC ====================
    function renderQuestion() {
        const q = questions[currentQ];
        progressBar.style.width = `${((currentQ + 1) / 10) * 100}%`;
        progressText.textContent = `${currentQ + 1}/10`;
        backBtn.style.display = currentQ > 0 ? 'block' : 'none';
        quizCharacter.textContent = q.emoji;

        const area = document.getElementById('question-area');
        area.classList.remove('slide-in');
        void area.offsetWidth;
        area.classList.add('slide-in');

        questionText.textContent = q.text;
        optionsDiv.innerHTML = '';

        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            if (answers[currentQ] === i) btn.classList.add('selected');
            btn.textContent = `${opt.emoji} ${opt.text}`;
            btn.addEventListener('click', () => selectOption(i));
            optionsDiv.appendChild(btn);
        });
    }

    function selectOption(index) {
        answers[currentQ] = index;

        const btns = optionsDiv.querySelectorAll('.option-btn');
        btns.forEach(b => b.classList.remove('selected'));
        btns[index].classList.add('selected');

        setTimeout(() => {
            if (currentQ < 9) {
                currentQ++;
                renderQuestion();
            } else {
                showLoading();
            }
        }, 300);
    }

    // ==================== LOADING ====================
    function showLoading() {
        showPage('loading');
        loadingBar.style.width = '0%';
        loadingText.textContent = '대화 패턴 분석 중...';
        loadingEmoji.textContent = '🔍';

        setTimeout(() => { loadingBar.style.width = '35%'; }, 100);
        setTimeout(() => {
            loadingText.textContent = '유형 매칭 중...';
            loadingEmoji.textContent = '🧩';
            loadingBar.style.width = '70%';
        }, 1200);
        setTimeout(() => {
            loadingText.textContent = '완료!';
            loadingEmoji.textContent = '🎉';
            loadingBar.style.width = '100%';
        }, 2400);
        setTimeout(() => {
            showResult();
        }, 3000);
    }

    // ==================== SCORING ====================
    function calculateResult() {
        const scores = {
            '주도형': 0,
            '경청형': 0,
            '조율형': 0,
            '논리형': 0,
            '공감형': 0,
            '분위기형': 0
        };

        answers.forEach((ansIdx, qIdx) => {
            if (ansIdx !== null) {
                const type = questions[qIdx].options[ansIdx].type;
                scores[type] += 2;
            }
        });

        const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        return { winner: sorted[0][0], scores };
    }

    // ==================== RESULT ====================
    function showResult() {
        showPage('result');
        const { winner, scores } = calculateResult();
        const data = typeData[winner];
        const maxScore = Math.max(...Object.values(scores), 1);

        const scoreChartHTML = Object.entries(scores)
            .sort((a, b) => b[1] - a[1])
            .map(([type, score]) => {
                const pct = Math.round((score / maxScore) * 100);
                const isTop = type === winner;
                return `
                    <div class="score-row">
                        <span class="score-label">${typeData[type].emoji} ${type}</span>
                        <div class="score-bar-bg">
                            <div class="score-bar-fill ${isTop ? 'top' : ''}" style="width: 0%" data-width="${pct}%"></div>
                        </div>
                        <span class="score-value">${score}</span>
                    </div>
                `;
            }).join('');

        resultContainer.innerHTML = `
            <div class="result-confetti">🎊 ✨ 🎊</div>

            <div class="result-card">
                <p class="result-label">너의 대화유형은</p>
                <div class="result-emoji">${data.emoji}</div>
                <h2 class="result-type-name">${data.name}</h2>
                <p class="result-catchphrase">${data.catchphrase}</p>
                <p class="result-desc">${data.desc}</p>
                <div class="score-chart">${scoreChartHTML}</div>
            </div>

            <div class="share-section">
                <p class="share-title">친구에게 공유하기</p>
                <div class="share-buttons">
                    <button class="share-btn kakao" id="share-kakao">💬 카카오톡</button>
                    <button class="share-btn x" id="share-x">𝕏 공유하기</button>
                    <button class="share-btn copy" id="share-copy">🔗 링크 복사</button>
                </div>
            </div>

            <div class="traits-section">
                <p class="traits-title">💪 나의 대화 강점</p>
                ${data.strengths.map(s => `<div class="trait-item"><span>✅</span><span>${s}</span></div>`).join('')}
            </div>

            <div class="traits-section">
                <p class="traits-title">⚡ 주의할 점</p>
                ${data.weaknesses.map(w => `<div class="trait-item"><span>⚠️</span><span>${w}</span></div>`).join('')}
            </div>

            <div class="compat-section">
                <p class="compat-title">💕 대화 궁합</p>
                <div class="compat-row compat-good">
                    <span>✅</span>
                    <span>잘 맞는 유형: ${data.goodMatch}</span>
                </div>
                <div class="compat-row compat-bad">
                    <span>⛔</span>
                    <span>안 맞는 유형: ${data.badMatch}</span>
                </div>
            </div>

            <div class="premium-section">
                <p class="premium-header">🔒 상세 분석 리포트</p>
                <div class="premium-blur">
                    <p>나의 대화 강점 심층 분석 3가지</p>
                    <p>나의 대화 약점 개선 방법 2가지</p>
                    <p>유형별 맞춤 대화 전략 5가지</p>
                    <p>상황별 대화 스크립트 제공</p>
                </div>
                <button class="premium-btn" id="premium-btn">상세 분석 보기 — ₩1,900</button>
            </div>

            <div class="cta-section">
                <p class="cta-section-text">${data.closerCTA}</p>
                <a href="https://thecloser.co.kr" target="_blank" rel="noopener" class="cta-closer-btn">
                    AI 대화 트레이닝 시작하기 →
                </a>
            </div>

            <div class="retry-section">
                <button class="retry-btn" id="retry-btn">🔄 테스트 다시 하기</button>
            </div>
        `;

        // Animate score bars
        setTimeout(() => {
            resultContainer.querySelectorAll('.score-bar-fill').forEach(bar => {
                bar.style.width = bar.dataset.width;
            });
        }, 100);

        // Share handlers
        document.getElementById('share-kakao').addEventListener('click', shareKakao);
        document.getElementById('share-x').addEventListener('click', () => shareX(data));
        document.getElementById('share-copy').addEventListener('click', shareCopy);
        document.getElementById('premium-btn').addEventListener('click', () => {
            showToast('결제 기능 준비 중입니다!');
        });
        document.getElementById('retry-btn').addEventListener('click', restart);
    }

    // ==================== SHARING ====================
    function shareKakao() {
        if (window.Kakao && window.Kakao.isInitialized()) {
            const { winner } = calculateResult();
            const data = typeData[winner];
            window.Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: `나의 대화유형은 ${data.emoji}${data.name}!`,
                    description: data.catchphrase,
                    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop',
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href,
                    },
                },
                buttons: [
                    {
                        title: '나도 테스트 하기',
                        link: {
                            mobileWebUrl: window.location.href,
                            webUrl: window.location.href,
                        },
                    },
                ],
            });
        } else {
            shareCopy();
            showToast('카카오 SDK가 로드되지 않아 링크가 복사되었어요');
        }
    }

    function shareX(data) {
        const text = `나의 대화유형은 ${data.emoji}${data.name}! ${data.catchphrase}\n너도 해봐!`;
        const url = window.location.href;
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            '_blank',
            'width=550,height=420'
        );
    }

    function shareCopy() {
        const btn = document.getElementById('share-copy');
        navigator.clipboard.writeText(window.location.href).then(() => {
            btn.classList.add('copied');
            btn.textContent = '✅ 복사 완료!';
            setTimeout(() => {
                btn.classList.remove('copied');
                btn.textContent = '🔗 링크 복사';
            }, 2000);
        }).catch(() => {
            showToast('링크 복사에 실패했어요');
        });
    }

    function showToast(msg) {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }

    // ==================== CONTACT FORM ====================
    const contactForm = document.getElementById('contact-form');
    const contactSuccess = document.getElementById('contact-success');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.contact-submit-btn');
            submitBtn.textContent = '전송 중...';
            submitBtn.disabled = true;

            try {
                const resp = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (resp.ok) {
                    contactForm.reset();
                    contactForm.style.display = 'none';
                    contactSuccess.style.display = 'block';
                } else {
                    showToast('전송에 실패했어요. 다시 시도해주세요.');
                    submitBtn.textContent = '📨 문의 보내기';
                    submitBtn.disabled = false;
                }
            } catch {
                showToast('네트워크 오류가 발생했어요.');
                submitBtn.textContent = '📨 문의 보내기';
                submitBtn.disabled = false;
            }
        });
    }

    // ==================== DISQUS THEME SYNC ====================
    const themeObserver = new MutationObserver(() => {
        if (window.DISQUS) {
            window.DISQUS.reset({ reload: true });
        }
    });
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // ==================== RESTART ====================
    function restart() {
        currentQ = 0;
        answers.fill(null);
        showPage('landing');
    }

    // ==================== PHOTO UPLOAD / TEACHABLE MACHINE ====================
    let uploadedImage = null;

    async function loadTMModel() {
        if (tmModel) return;
        try {
            const modelURL = TM_MODEL_URL + 'model.json';
            const metadataURL = TM_MODEL_URL + 'metadata.json';
            tmModel = await tmImage.load(modelURL, metadataURL);
        } catch (err) {
            console.error('Model load error:', err);
        }
    }

    function handlePhotoUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(evt) {
            previewImg.src = evt.target.result;
            uploadPlaceholder.style.display = 'none';
            uploadPreview.style.display = 'block';
            captureBtn.style.display = 'inline-flex';
            uploadedImage = previewImg;

            // Load model in background and run prediction
            loadTMModel().then(() => {
                if (tmModel) predictFromImage(previewImg);
            });
        };
        reader.readAsDataURL(file);
    }

    async function predictFromImage(imgEl) {
        if (!tmModel) return;

        // Wait for image to load fully
        await new Promise(resolve => {
            if (imgEl.complete) resolve();
            else imgEl.onload = resolve;
        });

        const predictions = await tmModel.predict(imgEl);
        cameraPredictions.style.display = 'block';

        predictions.forEach(pred => {
            const pct = Math.round(pred.probability * 100);
            const row = document.getElementById('pred-' + pred.className);
            if (row) {
                row.querySelector('.pred-bar-fill').style.width = pct + '%';
                row.querySelector('.pred-pct').textContent = pct + '%';
                row.classList.toggle('top', pred.probability > 0.5);
            }
        });
    }

    function analyzeUploadedPhoto() {
        if (!uploadedImage) return;

        // Get current predictions from UI
        const scores = {
            '주도형': 0, '경청형': 0, '조율형': 0,
            '논리형': 0, '공감형': 0, '분위기형': 0
        };

        const predRows = document.querySelectorAll('.pred-row');
        predRows.forEach(row => {
            const label = row.id.replace('pred-', '');
            const pct = parseInt(row.querySelector('.pred-pct').textContent);
            const mappedType = tmClassMap[label];
            if (mappedType) {
                scores[mappedType] = Math.round((pct / 100) * 20);
            }
        });

        // Give unmapped types a small base score
        Object.keys(scores).forEach(key => {
            if (scores[key] === 0) scores[key] = Math.floor(Math.random() * 3) + 1;
        });

        // Show loading then result
        showPage('loading');
        loadingBar.style.width = '0%';
        loadingText.textContent = '표정 데이터 분석 중...';
        loadingEmoji.textContent = '📸';

        setTimeout(() => { loadingBar.style.width = '40%'; }, 100);
        setTimeout(() => {
            loadingText.textContent = 'AI가 유형 매칭 중...';
            loadingEmoji.textContent = '🤖';
            loadingBar.style.width = '75%';
        }, 1000);
        setTimeout(() => {
            loadingText.textContent = '분석 완료!';
            loadingEmoji.textContent = '🎉';
            loadingBar.style.width = '100%';
        }, 2000);
        setTimeout(() => {
            showResultFromCamera(scores);
        }, 2600);
    }

    function resetUploadUI() {
        uploadPlaceholder.style.display = 'block';
        uploadPreview.style.display = 'none';
        captureBtn.style.display = 'none';
        cameraPredictions.style.display = 'none';
        photoInput.value = '';
        uploadedImage = null;
        // Reset prediction bars
        document.querySelectorAll('.pred-row').forEach(row => {
            row.querySelector('.pred-bar-fill').style.width = '0%';
            row.querySelector('.pred-pct').textContent = '0%';
            row.classList.remove('top');
        });
    }

    function showResultFromCamera(scores) {
        showPage('result');
        const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        const winner = sorted[0][0];
        const data = typeData[winner];
        const maxScore = Math.max(...Object.values(scores), 1);

        const scoreChartHTML = sorted
            .map(([type, score]) => {
                const pct = Math.round((score / maxScore) * 100);
                const isTop = type === winner;
                return `
                    <div class="score-row">
                        <span class="score-label">${typeData[type].emoji} ${type}</span>
                        <div class="score-bar-bg">
                            <div class="score-bar-fill ${isTop ? 'top' : ''}" style="width: 0%" data-width="${pct}%"></div>
                        </div>
                        <span class="score-value">${score}</span>
                    </div>
                `;
            }).join('');

        resultContainer.innerHTML = `
            <div class="result-confetti">🎊 ✨ 🎊</div>
            <div class="result-card">
                <div class="result-method-badge">📸 AI 얼굴 분석 결과</div>
                <p class="result-label">너의 대화유형은</p>
                <div class="result-emoji">${data.emoji}</div>
                <h2 class="result-type-name">${data.name}</h2>
                <p class="result-catchphrase">${data.catchphrase}</p>
                <p class="result-desc">${data.desc}</p>
                <div class="score-chart">${scoreChartHTML}</div>
            </div>

            <div class="share-section">
                <p class="share-title">친구에게 공유하기</p>
                <div class="share-buttons">
                    <button class="share-btn kakao" id="share-kakao">💬 카카오톡</button>
                    <button class="share-btn x" id="share-x">𝕏 공유하기</button>
                    <button class="share-btn copy" id="share-copy">🔗 링크 복사</button>
                </div>
            </div>

            <div class="traits-section">
                <p class="traits-title">💪 나의 대화 강점</p>
                ${data.strengths.map(s => `<div class="trait-item"><span>✅</span><span>${s}</span></div>`).join('')}
            </div>

            <div class="traits-section">
                <p class="traits-title">⚡ 주의할 점</p>
                ${data.weaknesses.map(w => `<div class="trait-item"><span>⚠️</span><span>${w}</span></div>`).join('')}
            </div>

            <div class="compat-section">
                <p class="compat-title">💕 대화 궁합</p>
                <div class="compat-row compat-good"><span>✅</span><span>잘 맞는 유형: ${data.goodMatch}</span></div>
                <div class="compat-row compat-bad"><span>⛔</span><span>안 맞는 유형: ${data.badMatch}</span></div>
            </div>

            <div class="cta-section">
                <p class="cta-section-text">${data.closerCTA}</p>
                <a href="https://thecloser.co.kr" target="_blank" rel="noopener" class="cta-closer-btn">
                    AI 대화 트레이닝 시작하기 →
                </a>
            </div>

            <div class="retry-section">
                <button class="retry-btn" id="retry-btn">🔄 테스트 다시 하기</button>
            </div>
        `;

        setTimeout(() => {
            resultContainer.querySelectorAll('.score-bar-fill').forEach(bar => {
                bar.style.width = bar.dataset.width;
            });
        }, 100);

        document.getElementById('share-kakao').addEventListener('click', shareKakao);
        document.getElementById('share-x').addEventListener('click', () => shareX(data));
        document.getElementById('share-copy').addEventListener('click', shareCopy);
        document.getElementById('retry-btn').addEventListener('click', restart);
    }

    // ==================== EVENT LISTENERS ====================
    startBtn.addEventListener('click', () => {
        showPage('quiz');
        currentQ = 0;
        answers.fill(null);
        renderQuestion();
    });

    cameraBtn.addEventListener('click', () => {
        showPage('camera');
        loadTMModel(); // Preload model
    });

    cameraBackBtn.addEventListener('click', () => {
        resetUploadUI();
        showPage('landing');
    });

    photoInput.addEventListener('change', handlePhotoUpload);

    changePhotoBtn.addEventListener('click', () => {
        resetUploadUI();
        photoInput.click();
    });

    captureBtn.addEventListener('click', analyzeUploadedPhoto);

    backBtn.addEventListener('click', () => {
        if (currentQ > 0) {
            currentQ--;
            renderQuestion();
        }
    });

    // ==================== NAVIGATION ====================
    const navHamburger = document.getElementById('nav-hamburger');
    const navLinks = document.getElementById('nav-links');

    if (navHamburger && navLinks) {
        navHamburger.addEventListener('click', () => {
            navHamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close mobile menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navHamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ==================== FAQ ACCORDION ====================
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const wasOpen = item.classList.contains('open');
            // Close all others
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            if (!wasOpen) item.classList.add('open');
        });
    });

    // ==================== MODALS ====================
    function openModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add('active');
    }

    function closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove('active');
    }

    // Privacy modal triggers
    const privacyTriggers = [
        document.getElementById('nav-privacy-link'),
        document.getElementById('footer-privacy-link')
    ];
    privacyTriggers.forEach(el => {
        if (el) el.addEventListener('click', (e) => { e.preventDefault(); openModal('privacy-modal'); });
    });

    // Terms modal trigger
    const termsTrigger = document.getElementById('footer-terms-link');
    if (termsTrigger) termsTrigger.addEventListener('click', (e) => { e.preventDefault(); openModal('terms-modal'); });

    // About modal trigger
    const aboutTrigger = document.getElementById('footer-about-link');
    if (aboutTrigger) aboutTrigger.addEventListener('click', (e) => { e.preventDefault(); openModal('about-modal'); });

    // Close buttons
    document.getElementById('privacy-close')?.addEventListener('click', () => closeModal('privacy-modal'));
    document.getElementById('terms-close')?.addEventListener('click', () => closeModal('terms-modal'));
    document.getElementById('about-close')?.addEventListener('click', () => closeModal('about-modal'));

    // Close on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.classList.remove('active');
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
        }
    });
});
