document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');
    const recommendButton = document.getElementById('recommend-button');
    const resultDiv = document.getElementById('result');

    // i18n translations
    const i18n = {
        ko: {
            title: '🍽️ 오늘 저녁 뭐 먹지?',
            subtitle: '기분과 상황을 알려주면 딱 맞는 저녁 메뉴를 추천해드려요!',
            'label-mood': '기분',
            'label-people': '식사 인원',
            'label-type': '음식 종류',
            'mood-happy': '기분 좋음',
            'mood-tired': '피곤함',
            'mood-stressed': '스트레스',
            'mood-cold': '추움',
            'mood-hot': '더움',
            'people-solo': '혼밥',
            'people-couple': '2인',
            'people-group': '단체',
            'type-korean': '한식',
            'type-chinese': '중식',
            'type-japanese': '일식',
            'type-western': '양식',
            'type-any': '아무거나',
            recommend: '🍴 메뉴 추천 받기!',
            loading: '메뉴 고르는 중...',
            retry: '🔄 다른 메뉴 추천',
            langBtn: '🌐 EN',
            themeDark: '🌙',
            themeLight: '☀️',
        },
        en: {
            title: '🍽️ What\'s for Dinner?',
            subtitle: 'Tell us your mood and we\'ll recommend the perfect dinner!',
            'label-mood': 'Mood',
            'label-people': 'Party Size',
            'label-type': 'Cuisine',
            'mood-happy': 'Happy',
            'mood-tired': 'Tired',
            'mood-stressed': 'Stressed',
            'mood-cold': 'Feeling Cold',
            'mood-hot': 'Feeling Hot',
            'people-solo': 'Solo',
            'people-couple': 'Two',
            'people-group': 'Group',
            'type-korean': 'Korean',
            'type-chinese': 'Chinese',
            'type-japanese': 'Japanese',
            'type-western': 'Western',
            'type-any': 'Surprise Me',
            recommend: '🍴 Get a Recommendation!',
            loading: 'Picking the perfect dish...',
            retry: '🔄 Try Another',
            langBtn: '🌐 KO',
            themeDark: '🌙',
            themeLight: '☀️',
        }
    };

    // Menu database with both languages
    const menus = [
        { name: { ko: '김치찌개', en: 'Kimchi Stew' }, emoji: '🍲', desc: { ko: '얼큰하고 깊은 맛의 한국 대표 찌개', en: 'Korea\'s signature spicy stew with fermented kimchi' }, type: 'korean', mood: ['stressed', 'cold'], people: ['solo', 'couple', 'group'], tags: { ko: ['매운맛', '국물요리', '밥도둑'], en: ['Spicy', 'Soup', 'Comfort Food'] }, image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=600&h=400&fit=crop' },
        { name: { ko: '된장찌개', en: 'Soybean Paste Stew' }, emoji: '🫕', desc: { ko: '구수한 된장과 두부의 건강한 조합', en: 'Hearty stew with fermented soybean paste and tofu' }, type: 'korean', mood: ['tired', 'cold'], people: ['solo', 'couple'], tags: { ko: ['건강식', '국물요리', '집밥'], en: ['Healthy', 'Soup', 'Home-style'] }, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop' },
        { name: { ko: '삼겹살', en: 'Korean BBQ Pork Belly' }, emoji: '🥓', desc: { ko: '불판 위에서 지글지글 구워먹는 행복', en: 'Sizzling grilled pork belly — pure happiness on a plate' }, type: 'korean', mood: ['happy', 'stressed'], people: ['couple', 'group'], tags: { ko: ['고기', '회식', '소주안주'], en: ['Meat', 'Social', 'Grilled'] }, image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&h=400&fit=crop' },
        { name: { ko: '비빔밥', en: 'Bibimbap' }, emoji: '🍚', desc: { ko: '다양한 나물과 고추장의 완벽한 조화', en: 'Mixed rice bowl with fresh veggies and spicy gochujang sauce' }, type: 'korean', mood: ['happy', 'tired'], people: ['solo'], tags: { ko: ['건강식', '간편식', '영양만점'], en: ['Healthy', 'Quick', 'Nutritious'] }, image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=600&h=400&fit=crop' },
        { name: { ko: '불고기', en: 'Bulgogi' }, emoji: '🥩', desc: { ko: '달콤짭짤한 양념의 부드러운 고기', en: 'Sweet and savory marinated beef — a Korean classic' }, type: 'korean', mood: ['happy', 'cold'], people: ['couple', 'group'], tags: { ko: ['고기', '달콤한맛', '인기메뉴'], en: ['Meat', 'Sweet', 'Popular'] }, image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=400&fit=crop' },
        { name: { ko: '냉면', en: 'Cold Noodles' }, emoji: '🍜', desc: { ko: '시원한 육수에 쫄깃한 면발', en: 'Chilled buckwheat noodles in icy broth' }, type: 'korean', mood: ['hot', 'stressed'], people: ['solo', 'couple'], tags: { ko: ['시원함', '면요리', '여름별미'], en: ['Refreshing', 'Noodles', 'Summer'] }, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop' },
        { name: { ko: '짜장면', en: 'Jajangmyeon' }, emoji: '🍝', desc: { ko: '달콤한 춘장소스의 중화면 요리', en: 'Noodles in rich black bean sauce' }, type: 'chinese', mood: ['happy', 'tired'], people: ['solo', 'couple'], tags: { ko: ['면요리', '배달음식', '달콤한맛'], en: ['Noodles', 'Delivery', 'Sweet'] }, image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600&h=400&fit=crop' },
        { name: { ko: '짬뽕', en: 'Jjamppong' }, emoji: '🍜', desc: { ko: '해산물이 듬뿍 들어간 얼큰한 면요리', en: 'Spicy seafood noodle soup loaded with fresh catch' }, type: 'chinese', mood: ['cold', 'stressed'], people: ['solo', 'couple'], tags: { ko: ['매운맛', '면요리', '해산물'], en: ['Spicy', 'Noodles', 'Seafood'] }, image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=600&h=400&fit=crop' },
        { name: { ko: '탕수육', en: 'Sweet & Sour Pork' }, emoji: '🍖', desc: { ko: '바삭한 튀김과 새콤달콤한 소스', en: 'Crispy fried pork with tangy sweet and sour glaze' }, type: 'chinese', mood: ['happy'], people: ['couple', 'group'], tags: { ko: ['튀김', '새콤달콤', '파티음식'], en: ['Fried', 'Tangy', 'Party Food'] }, image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&h=400&fit=crop' },
        { name: { ko: '마라탕', en: 'Mala Hot Pot' }, emoji: '🌶️', desc: { ko: '마비되는 매운맛의 중독성 있는 국물', en: 'Numbing-spicy broth that\'s addictively delicious' }, type: 'chinese', mood: ['stressed', 'cold'], people: ['solo', 'couple'], tags: { ko: ['매운맛', '국물요리', '트렌디'], en: ['Spicy', 'Soup', 'Trendy'] }, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&h=400&fit=crop' },
        { name: { ko: '초밥', en: 'Sushi' }, emoji: '🍣', desc: { ko: '신선한 생선과 식초밥의 조화', en: 'Fresh fish on perfectly seasoned vinegared rice' }, type: 'japanese', mood: ['happy', 'hot'], people: ['solo', 'couple'], tags: { ko: ['생선', '깔끔한맛', '고급'], en: ['Fish', 'Clean', 'Premium'] }, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=400&fit=crop' },
        { name: { ko: '라멘', en: 'Ramen' }, emoji: '🍜', desc: { ko: '진한 돈코츠 육수의 일본 면요리', en: 'Rich tonkotsu pork bone broth with springy noodles' }, type: 'japanese', mood: ['tired', 'cold'], people: ['solo'], tags: { ko: ['면요리', '국물요리', '진한맛'], en: ['Noodles', 'Soup', 'Rich'] }, image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=600&h=400&fit=crop' },
        { name: { ko: '돈카츠', en: 'Tonkatsu' }, emoji: '🍱', desc: { ko: '바삭한 돈까스에 소스를 듬뿍', en: 'Golden crispy breaded pork cutlet with savory sauce' }, type: 'japanese', mood: ['happy', 'tired'], people: ['solo', 'couple'], tags: { ko: ['튀김', '간편식', '인기메뉴'], en: ['Fried', 'Quick', 'Popular'] }, image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&h=400&fit=crop' },
        { name: { ko: '우동', en: 'Udon' }, emoji: '🍲', desc: { ko: '따뜻한 국물에 쫄깃한 굵은 면', en: 'Thick chewy noodles in warm savory broth' }, type: 'japanese', mood: ['tired', 'cold'], people: ['solo'], tags: { ko: ['면요리', '국물요리', '담백한맛'], en: ['Noodles', 'Soup', 'Mild'] }, image: 'https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?w=600&h=400&fit=crop' },
        { name: { ko: '파스타', en: 'Pasta' }, emoji: '🍝', desc: { ko: '크림, 토마토, 오일 다양한 소스의 면요리', en: 'Italian noodles with cream, tomato, or olive oil sauce' }, type: 'western', mood: ['happy'], people: ['solo', 'couple'], tags: { ko: ['면요리', '데이트', '세련된맛'], en: ['Noodles', 'Date Night', 'Classy'] }, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop' },
        { name: { ko: '피자', en: 'Pizza' }, emoji: '🍕', desc: { ko: '쭉 늘어나는 치즈와 다양한 토핑', en: 'Stretchy melted cheese with your favorite toppings' }, type: 'western', mood: ['happy', 'stressed'], people: ['couple', 'group'], tags: { ko: ['배달음식', '파티음식', '치즈'], en: ['Delivery', 'Party Food', 'Cheesy'] }, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop' },
        { name: { ko: '햄버거', en: 'Burger' }, emoji: '🍔', desc: { ko: '육즙 가득한 패티와 신선한 야채', en: 'Juicy patty stacked with fresh veggies and special sauce' }, type: 'western', mood: ['happy', 'tired'], people: ['solo'], tags: { ko: ['간편식', '패스트푸드', '육즙'], en: ['Quick', 'Fast Food', 'Juicy'] }, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop' },
        { name: { ko: '스테이크', en: 'Steak' }, emoji: '🥩', desc: { ko: '완벽하게 구운 두툼한 고기', en: 'Perfectly seared thick-cut steak cooked to your liking' }, type: 'western', mood: ['happy', 'stressed'], people: ['couple'], tags: { ko: ['고기', '데이트', '특별한날'], en: ['Meat', 'Date Night', 'Special'] }, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=400&fit=crop' },
        { name: { ko: '떡볶이', en: 'Tteokbokki' }, emoji: '🍢', desc: { ko: '매콤달콤한 국민 간식', en: 'Spicy-sweet chewy rice cakes — Korea\'s favorite snack' }, type: 'korean', mood: ['stressed', 'happy'], people: ['solo', 'couple'], tags: { ko: ['매운맛', '간식', '분식'], en: ['Spicy', 'Snack', 'Street Food'] }, image: 'https://images.unsplash.com/photo-1635363638580-c2809d049eee?w=600&h=400&fit=crop' },
        { name: { ko: '치킨', en: 'Korean Fried Chicken' }, emoji: '🍗', desc: { ko: '바삭한 튀김옷과 촉촉한 닭고기', en: 'Ultra-crispy fried chicken — the king of Korean delivery' }, type: 'korean', mood: ['happy', 'stressed', 'tired'], people: ['solo', 'couple', 'group'], tags: { ko: ['튀김', '배달음식', '맥주안주'], en: ['Fried', 'Delivery', 'Beer Pairing'] }, image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&h=400&fit=crop' },
        { name: { ko: '삼계탕', en: 'Ginseng Chicken Soup' }, emoji: '🍲', desc: { ko: '인삼과 닭의 보양식', en: 'Whole chicken stuffed with ginseng, rice, and herbs' }, type: 'korean', mood: ['tired', 'hot'], people: ['solo'], tags: { ko: ['보양식', '건강식', '국물요리'], en: ['Restorative', 'Healthy', 'Soup'] }, image: 'https://images.unsplash.com/photo-1583224994076-0a3b94f10898?w=600&h=400&fit=crop' },
        { name: { ko: '칼국수', en: 'Kalguksu' }, emoji: '🍜', desc: { ko: '손으로 직접 만든 쫄깃한 면과 시원한 국물', en: 'Hand-cut knife noodles in a clear savory broth' }, type: 'korean', mood: ['tired', 'cold'], people: ['solo', 'couple'], tags: { ko: ['면요리', '국물요리', '집밥'], en: ['Noodles', 'Soup', 'Home-style'] }, image: 'https://images.unsplash.com/photo-1552611052-33e04de145ba?w=600&h=400&fit=crop' },
        { name: { ko: '타코', en: 'Tacos' }, emoji: '🌮', desc: { ko: '바삭한 또띠아에 다양한 토핑', en: 'Crunchy or soft tortillas loaded with savory fillings' }, type: 'western', mood: ['happy', 'stressed'], people: ['solo', 'couple', 'group'], tags: { ko: ['간편식', '멕시칸', '파티음식'], en: ['Quick', 'Mexican', 'Party Food'] }, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop' },
        { name: { ko: '카레', en: 'Curry' }, emoji: '🍛', desc: { ko: '향신료가 어우러진 깊은 풍미의 카레', en: 'Aromatic spiced curry with tender meat and vegetables' }, type: 'japanese', mood: ['tired', 'cold'], people: ['solo', 'couple'], tags: { ko: ['향신료', '간편식', '밥요리'], en: ['Spiced', 'Quick', 'Rice Dish'] }, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop' },
        { name: { ko: '샐러드 보울', en: 'Salad Bowl' }, emoji: '🥗', desc: { ko: '신선한 채소와 단백질의 건강한 한 그릇', en: 'Fresh greens with protein for a light, healthy meal' }, type: 'western', mood: ['hot', 'happy'], people: ['solo'], tags: { ko: ['건강식', '다이어트', '가벼운식사'], en: ['Healthy', 'Light', 'Fresh'] }, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop' },
    ];

    let currentLang = localStorage.getItem('lang') || 'ko';

    // Theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = i18n[currentLang].themeLight;
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.textContent = isDark ? i18n[currentLang].themeLight : i18n[currentLang].themeDark;
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Language
    function applyLang(lang) {
        currentLang = lang;
        const t = i18n[lang];
        document.getElementById('title').textContent = t.title;
        document.getElementById('subtitle').textContent = t.subtitle;
        document.getElementById('label-mood').textContent = t['label-mood'];
        document.getElementById('label-people').textContent = t['label-people'];
        document.getElementById('label-type').textContent = t['label-type'];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            el.textContent = t[el.dataset.i18n];
        });
        recommendButton.textContent = t.recommend;
        langToggle.textContent = t.langBtn;
        document.documentElement.lang = lang;

        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.textContent = isDark ? t.themeLight : t.themeDark;

        localStorage.setItem('lang', lang);
    }

    langToggle.addEventListener('click', () => {
        applyLang(currentLang === 'ko' ? 'en' : 'ko');
        resultDiv.innerHTML = '';
    });

    applyLang(currentLang);

    // Filter selection
    document.querySelectorAll('.filter-options').forEach(group => {
        group.addEventListener('click', (e) => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;
            group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    function getSelected(groupId) {
        const active = document.querySelector(`#${groupId} .filter-btn.active`);
        return active ? active.dataset.value : null;
    }

    function recommend() {
        const mood = getSelected('mood-options');
        const people = getSelected('people-options');
        const type = getSelected('type-options');
        const t = i18n[currentLang];

        let filtered = [...menus];
        if (mood) filtered = filtered.filter(m => m.mood.includes(mood));
        if (people) filtered = filtered.filter(m => m.people.includes(people));
        if (type && type !== 'any') filtered = filtered.filter(m => m.type === type);
        if (filtered.length === 0) filtered = [...menus];

        const pick = filtered[Math.floor(Math.random() * filtered.length)];

        resultDiv.innerHTML = `<div class="loading"><div class="spinner"></div><br>${t.loading}</div>`;

        setTimeout(() => {
            const imageHtml = pick.image
                ? `<img class="menu-image" src="${pick.image}" alt="${pick.name[currentLang]}">`
                : '';
            resultDiv.innerHTML = `
                <div class="menu-card">
                    ${imageHtml}
                    <h2>${pick.emoji} ${pick.name[currentLang]}</h2>
                    <p class="menu-desc">${pick.desc[currentLang]}</p>
                    <div class="menu-tags">
                        ${pick.tags[currentLang].map(tag => `<span class="tag">#${tag}</span>`).join('')}
                    </div>
                    <button class="retry-btn" id="retry-btn">${t.retry}</button>
                </div>
            `;
            document.getElementById('retry-btn').addEventListener('click', recommend);
        }, 1000);
    }

    recommendButton.addEventListener('click', recommend);
});
