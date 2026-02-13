document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const recommendButton = document.getElementById('recommend-button');
    const resultDiv = document.getElementById('result');

    // Theme toggle
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ 라이트모드';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.textContent = isDark ? '☀️ 라이트모드' : '🌙 다크모드';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Filter selection
    document.querySelectorAll('.filter-options').forEach(group => {
        group.addEventListener('click', (e) => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;
            group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Menu database
    const menus = [
        { name: '김치찌개', emoji: '🍲', desc: '얼큰하고 깊은 맛의 한국 대표 찌개', type: 'korean', mood: ['stressed', 'cold'], people: ['solo', 'couple', 'group'], tags: ['매운맛', '국물요리', '밥도둑'] },
        { name: '된장찌개', emoji: '🫕', desc: '구수한 된장과 두부의 건강한 조합', type: 'korean', mood: ['tired', 'cold'], people: ['solo', 'couple'], tags: ['건강식', '국물요리', '집밥'] },
        { name: '삼겹살', emoji: '🥓', desc: '불판 위에서 지글지글 구워먹는 행복', type: 'korean', mood: ['happy', 'stressed'], people: ['couple', 'group'], tags: ['고기', '회식', '소주안주'] },
        { name: '비빔밥', emoji: '🍚', desc: '다양한 나물과 고추장의 완벽한 조화', type: 'korean', mood: ['happy', 'tired'], people: ['solo'], tags: ['건강식', '간편식', '영양만점'] },
        { name: '불고기', emoji: '🥩', desc: '달콤짭짤한 양념의 부드러운 고기', type: 'korean', mood: ['happy', 'cold'], people: ['couple', 'group'], tags: ['고기', '달콤한맛', '인기메뉴'] },
        { name: '냉면', emoji: '🍜', desc: '시원한 육수에 쫄깃한 면발', type: 'korean', mood: ['hot', 'stressed'], people: ['solo', 'couple'], tags: ['시원함', '면요리', '여름별미'] },
        { name: '짜장면', emoji: '🍝', desc: '달콤한 춘장소스의 중화면 요리', type: 'chinese', mood: ['happy', 'tired'], people: ['solo', 'couple'], tags: ['면요리', '배달음식', '달콤한맛'] },
        { name: '짬뽕', emoji: '🍜', desc: '해산물이 듬뿍 들어간 얼큰한 면요리', type: 'chinese', mood: ['cold', 'stressed'], people: ['solo', 'couple'], tags: ['매운맛', '면요리', '해산물'] },
        { name: '탕수육', emoji: '🍖', desc: '바삭한 튀김과 새콤달콤한 소스', type: 'chinese', mood: ['happy'], people: ['couple', 'group'], tags: ['튀김', '새콤달콤', '파티음식'] },
        { name: '마라탕', emoji: '🌶️', desc: '마비되는 매운맛의 중독성 있는 국물', type: 'chinese', mood: ['stressed', 'cold'], people: ['solo', 'couple'], tags: ['매운맛', '국물요리', '트렌디'] },
        { name: '초밥', emoji: '🍣', desc: '신선한 생선과 식초밥의 조화', type: 'japanese', mood: ['happy', 'hot'], people: ['solo', 'couple'], tags: ['생선', '깔끔한맛', '고급'] },
        { name: '라멘', emoji: '🍜', desc: '진한 돈코츠 육수의 일본 면요리', type: 'japanese', mood: ['tired', 'cold'], people: ['solo'], tags: ['면요리', '국물요리', '진한맛'] },
        { name: '돈카츠', emoji: '🍱', desc: '바삭한 돈까스에 소스를 듬뿍', type: 'japanese', mood: ['happy', 'tired'], people: ['solo', 'couple'], tags: ['튀김', '간편식', '인기메뉴'] },
        { name: '우동', emoji: '🍲', desc: '따뜻한 국물에 쫄깃한 굵은 면', type: 'japanese', mood: ['tired', 'cold'], people: ['solo'], tags: ['면요리', '국물요리', '담백한맛'] },
        { name: '파스타', emoji: '🍝', desc: '크림, 토마토, 오일 다양한 소스의 면요리', type: 'western', mood: ['happy'], people: ['solo', 'couple'], tags: ['면요리', '데이트', '세련된맛'] },
        { name: '피자', emoji: '🍕', desc: '쭉 늘어나는 치즈와 다양한 토핑', type: 'western', mood: ['happy', 'stressed'], people: ['couple', 'group'], tags: ['배달음식', '파티음식', '치즈'] },
        { name: '햄버거', emoji: '🍔', desc: '육즙 가득한 패티와 신선한 야채', type: 'western', mood: ['happy', 'tired'], people: ['solo'], tags: ['간편식', '패스트푸드', '육즙'] },
        { name: '스테이크', emoji: '🥩', desc: '완벽하게 구운 두툼한 고기', type: 'western', mood: ['happy', 'stressed'], people: ['couple'], tags: ['고기', '데이트', '특별한날'] },
        { name: '떡볶이', emoji: '🍢', desc: '매콤달콤한 국민 간식', type: 'korean', mood: ['stressed', 'happy'], people: ['solo', 'couple'], tags: ['매운맛', '간식', '분식'] },
        { name: '치킨', emoji: '🍗', desc: '바삭한 튀김옷과 촉촉한 닭고기', type: 'korean', mood: ['happy', 'stressed', 'tired'], people: ['solo', 'couple', 'group'], tags: ['튀김', '배달음식', '맥주안주'] },
        { name: '삼계탕', emoji: '🍲', desc: '인삼과 닭의 보양식', type: 'korean', mood: ['tired', 'hot'], people: ['solo'], tags: ['보양식', '건강식', '국물요리'] },
        { name: '칼국수', emoji: '🍜', desc: '손으로 직접 만든 쫄깃한 면과 시원한 국물', type: 'korean', mood: ['tired', 'cold'], people: ['solo', 'couple'], tags: ['면요리', '국물요리', '집밥'] },
    ];

    function getSelected(groupId) {
        const active = document.querySelector(`#${groupId} .filter-btn.active`);
        return active ? active.dataset.value : null;
    }

    function recommend() {
        const mood = getSelected('mood-options');
        const people = getSelected('people-options');
        const type = getSelected('type-options');

        let filtered = [...menus];

        if (mood) filtered = filtered.filter(m => m.mood.includes(mood));
        if (people) filtered = filtered.filter(m => m.people.includes(people));
        if (type && type !== 'any') filtered = filtered.filter(m => m.type === type);

        if (filtered.length === 0) filtered = [...menus];

        const pick = filtered[Math.floor(Math.random() * filtered.length)];

        resultDiv.innerHTML = '<div class="loading"><div class="spinner"></div><br>메뉴 고르는 중...</div>';

        setTimeout(() => {
            resultDiv.innerHTML = `
                <div class="menu-card">
                    <h2>${pick.emoji} ${pick.name}</h2>
                    <p class="menu-desc">${pick.desc}</p>
                    <div class="menu-tags">
                        ${pick.tags.map(t => `<span class="tag">#${t}</span>`).join('')}
                    </div>
                    <button class="retry-btn" id="retry-btn">🔄 다른 메뉴 추천</button>
                </div>
            `;
            document.getElementById('retry-btn').addEventListener('click', recommend);
        }, 1000);
    }

    recommendButton.addEventListener('click', recommend);
});
