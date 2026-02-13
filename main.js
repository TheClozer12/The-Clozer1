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
            'type-world': '세계음식',
            'type-any': '아무거나',
            recommend: '🍴 메뉴 추천 받기!',
            loading: '메뉴 고르는 중...',
            retry: '🔄 다른 메뉴 추천',
            langBtn: '🌐 EN',
            themeDark: '🌙',
            themeLight: '☀️',
            'contact-title': '📩 제휴 문의',
            'contact-desc': '비즈니스 제휴, 광고, 협업 등 문의사항을 남겨주세요.',
            'form-label-name': '이름 / 회사명',
            'form-label-email': '이메일',
            'form-label-message': '문의 내용',
            'contact-submit': '📨 문의 보내기',
            'contact-success': '✅ 문의가 성공적으로 전송되었습니다!',
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
            'type-world': 'World',
            'type-any': 'Surprise Me',
            recommend: '🍴 Get a Recommendation!',
            loading: 'Picking the perfect dish...',
            retry: '🔄 Try Another',
            langBtn: '🌐 KO',
            themeDark: '🌙',
            themeLight: '☀️',
            'contact-title': '📩 Partnership Inquiry',
            'contact-desc': 'For business partnerships, advertising, or collaboration — drop us a message.',
            'form-label-name': 'Name / Company',
            'form-label-email': 'Email',
            'form-label-message': 'Message',
            'contact-submit': '📨 Send Inquiry',
            'contact-success': '✅ Your inquiry has been sent successfully!',
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
        // 세계 특별 음식 30가지
        { name: { ko: '풀레드포크', en: 'Pulled Pork' }, emoji: '🐷', desc: { ko: '저온에서 오랜 시간 훈연한 미국 남부식 돼지고기', en: 'Slow-smoked Southern BBQ pork, shredded to perfection' }, type: 'world', mood: ['happy', 'stressed'], people: ['couple', 'group'], tags: { ko: ['미국남부', '훈연', 'BBQ'], en: ['Southern US', 'Smoked', 'BBQ'] }, image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&h=400&fit=crop' },
        { name: { ko: '팟타이', en: 'Pad Thai' }, emoji: '🍜', desc: { ko: '새콤달콤한 태국식 볶음 쌀국수', en: 'Thailand\'s iconic stir-fried rice noodles with tamarind sauce' }, type: 'world', mood: ['happy', 'hot'], people: ['solo', 'couple'], tags: { ko: ['태국', '볶음면', '새콤달콤'], en: ['Thai', 'Stir-fried', 'Tangy'] }, image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&h=400&fit=crop' },
        { name: { ko: '펠메니', en: 'Pelmeni' }, emoji: '🥟', desc: { ko: '러시아 전통 만두, 사워크림과 함께', en: 'Russian meat dumplings served with sour cream' }, type: 'world', mood: ['cold', 'tired'], people: ['solo', 'couple'], tags: { ko: ['러시아', '만두', '전통음식'], en: ['Russian', 'Dumplings', 'Traditional'] }, image: 'https://images.unsplash.com/photo-1583752028088-91e3e9880b46?w=600&h=400&fit=crop' },
        { name: { ko: '반미', en: 'Banh Mi' }, emoji: '🥖', desc: { ko: '베트남식 바게트 샌드위치, 고수와 피클이 가득', en: 'Vietnamese baguette sandwich with cilantro, pickled veggies & pate' }, type: 'world', mood: ['happy', 'tired'], people: ['solo'], tags: { ko: ['베트남', '샌드위치', '길거리음식'], en: ['Vietnamese', 'Sandwich', 'Street Food'] }, image: 'https://images.unsplash.com/photo-1600688640154-9619e002df30?w=600&h=400&fit=crop' },
        { name: { ko: '케밥', en: 'Kebab' }, emoji: '🥙', desc: { ko: '터키식 양념 고기구이를 빵에 싸 먹는 요리', en: 'Turkish spiced grilled meat wrapped in warm flatbread' }, type: 'world', mood: ['happy', 'stressed'], people: ['solo', 'couple'], tags: { ko: ['터키', '고기구이', '길거리음식'], en: ['Turkish', 'Grilled', 'Street Food'] }, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&h=400&fit=crop' },
        { name: { ko: '무사카', en: 'Moussaka' }, emoji: '🍆', desc: { ko: '그리스식 가지와 다진 고기 오븐 요리', en: 'Greek layered casserole with eggplant, meat sauce & bechamel' }, type: 'world', mood: ['cold', 'tired'], people: ['couple', 'group'], tags: { ko: ['그리스', '오븐요리', '가지'], en: ['Greek', 'Baked', 'Eggplant'] }, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&h=400&fit=crop' },
        { name: { ko: '분짜', en: 'Bun Cha' }, emoji: '🍖', desc: { ko: '하노이식 숯불구이 돼지고기와 쌀국수', en: 'Hanoi-style chargrilled pork patties with rice vermicelli' }, type: 'world', mood: ['happy', 'hot'], people: ['solo', 'couple'], tags: { ko: ['베트남', '숯불구이', '하노이'], en: ['Vietnamese', 'Grilled', 'Hanoi'] }, image: 'https://images.unsplash.com/photo-1576577445504-6af96477db52?w=600&h=400&fit=crop' },
        { name: { ko: '엠파나다', en: 'Empanada' }, emoji: '🥟', desc: { ko: '아르헨티나식 고기 파이, 바삭한 껍질 속 풍부한 속', en: 'Argentine stuffed pastry with savory meat filling' }, type: 'world', mood: ['happy', 'tired'], people: ['solo', 'couple'], tags: { ko: ['아르헨티나', '파이', '간식'], en: ['Argentine', 'Pastry', 'Snack'] }, image: 'https://images.unsplash.com/photo-1604579278540-db564be5fc3b?w=600&h=400&fit=crop' },
        { name: { ko: '팔라펠', en: 'Falafel' }, emoji: '🧆', desc: { ko: '중동식 병아리콩 튀김볼, 후무스와 함께', en: 'Middle Eastern crispy chickpea fritters with hummus & tahini' }, type: 'world', mood: ['happy', 'hot'], people: ['solo'], tags: { ko: ['중동', '채식', '병아리콩'], en: ['Middle Eastern', 'Vegan', 'Chickpea'] }, image: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=600&h=400&fit=crop' },
        { name: { ko: '리소토', en: 'Risotto' }, emoji: '🍚', desc: { ko: '이탈리아식 크리미한 치즈 쌀요리', en: 'Italian creamy rice dish slow-cooked with parmesan & broth' }, type: 'world', mood: ['cold', 'happy'], people: ['couple'], tags: { ko: ['이탈리아', '쌀요리', '크리미'], en: ['Italian', 'Rice', 'Creamy'] }, image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=400&fit=crop' },
        { name: { ko: '포', en: 'Pho' }, emoji: '🍜', desc: { ko: '베트남 쌀국수, 진한 소뼈 육수의 깊은 맛', en: 'Vietnamese rice noodle soup with rich bone broth & fresh herbs' }, type: 'world', mood: ['tired', 'cold'], people: ['solo'], tags: { ko: ['베트남', '쌀국수', '국물요리'], en: ['Vietnamese', 'Noodle Soup', 'Aromatic'] }, image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&h=400&fit=crop' },
        { name: { ko: '페로기', en: 'Pierogi' }, emoji: '🥟', desc: { ko: '폴란드 전통 만두, 감자와 치즈 속이 가득', en: 'Polish dumplings stuffed with potato, cheese & caramelized onion' }, type: 'world', mood: ['cold', 'tired'], people: ['solo', 'couple'], tags: { ko: ['폴란드', '만두', '감자'], en: ['Polish', 'Dumplings', 'Potato'] }, image: 'https://images.unsplash.com/photo-1565280654386-36c3ea205191?w=600&h=400&fit=crop' },
        { name: { ko: '세비체', en: 'Ceviche' }, emoji: '🐟', desc: { ko: '페루식 라임에 절인 신선한 생선요리', en: 'Peruvian fresh raw fish cured in citrus juice with chili & cilantro' }, type: 'world', mood: ['hot', 'happy'], people: ['couple'], tags: { ko: ['페루', '해산물', '상큼한맛'], en: ['Peruvian', 'Seafood', 'Citrusy'] }, image: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=600&h=400&fit=crop' },
        { name: { ko: '렌당', en: 'Rendang' }, emoji: '🍛', desc: { ko: '인도네시아 코코넛밀크 소고기 조림, 세계 최고의 음식 선정', en: 'Indonesian dry coconut beef curry — voted world\'s best dish' }, type: 'world', mood: ['cold', 'stressed'], people: ['couple', 'group'], tags: { ko: ['인도네시아', '코코넛', '카레'], en: ['Indonesian', 'Coconut', 'Curry'] }, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880049?w=600&h=400&fit=crop' },
        { name: { ko: '슈니첼', en: 'Schnitzel' }, emoji: '🥩', desc: { ko: '오스트리아식 바삭한 빵가루 커틀릿', en: 'Austrian breaded & pan-fried veal cutlet, golden and crispy' }, type: 'world', mood: ['happy', 'tired'], people: ['solo', 'couple'], tags: { ko: ['오스트리아', '튀김', '커틀릿'], en: ['Austrian', 'Fried', 'Cutlet'] }, image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=600&h=400&fit=crop' },
        { name: { ko: '타진', en: 'Tagine' }, emoji: '🫕', desc: { ko: '모로코식 토기 냄비에 천천히 끓인 스튜', en: 'Moroccan slow-cooked stew with preserved lemons & olives' }, type: 'world', mood: ['cold', 'tired'], people: ['couple', 'group'], tags: { ko: ['모로코', '스튜', '향신료'], en: ['Moroccan', 'Stew', 'Spiced'] }, image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=600&h=400&fit=crop' },
        { name: { ko: '라크사', en: 'Laksa' }, emoji: '🍜', desc: { ko: '말레이시아 코코넛 커리 국수, 매콤하고 크리미', en: 'Malaysian spicy coconut curry noodle soup with shrimp' }, type: 'world', mood: ['cold', 'stressed'], people: ['solo'], tags: { ko: ['말레이시아', '코코넛', '매운맛'], en: ['Malaysian', 'Coconut', 'Spicy'] }, image: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=600&h=400&fit=crop' },
        { name: { ko: '시수케밥', en: 'Shish Kebab' }, emoji: '🍢', desc: { ko: '꼬치에 꿴 중동식 양념 고기구이', en: 'Skewered & grilled marinated meat chunks over charcoal' }, type: 'world', mood: ['happy', 'stressed'], people: ['couple', 'group'], tags: { ko: ['중동', '꼬치', '숯불구이'], en: ['Middle Eastern', 'Skewered', 'Charcoal'] }, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop' },
        { name: { ko: '뇨끼', en: 'Gnocchi' }, emoji: '🥔', desc: { ko: '이탈리아 감자 파스타, 부드러운 식감과 소스의 조화', en: 'Italian pillowy potato pasta in sage butter or tomato sauce' }, type: 'world', mood: ['cold', 'happy'], people: ['solo', 'couple'], tags: { ko: ['이탈리아', '감자', '파스타'], en: ['Italian', 'Potato', 'Pasta'] }, image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=400&fit=crop' },
        { name: { ko: '브리또', en: 'Burrito' }, emoji: '🌯', desc: { ko: '멕시코식 대형 또띠아에 밥, 고기, 콩을 가득 싼 요리', en: 'Giant Mexican tortilla wrap stuffed with rice, beans, meat & salsa' }, type: 'world', mood: ['happy', 'tired'], people: ['solo'], tags: { ko: ['멕시코', '간편식', '든든한'], en: ['Mexican', 'Quick', 'Hearty'] }, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&h=400&fit=crop' },
        { name: { ko: '훈제연어 베이글', en: 'Lox Bagel' }, emoji: '🥯', desc: { ko: '뉴욕식 크림치즈와 훈제연어를 올린 베이글', en: 'New York-style bagel with cream cheese, smoked salmon & capers' }, type: 'world', mood: ['happy', 'tired'], people: ['solo'], tags: { ko: ['뉴욕', '브런치', '연어'], en: ['New York', 'Brunch', 'Salmon'] }, image: 'https://images.unsplash.com/photo-1592415499556-74fcb9f18667?w=600&h=400&fit=crop' },
        { name: { ko: '모모', en: 'Momo' }, emoji: '🥟', desc: { ko: '네팔/티베트식 찐만두, 매콤한 토마토 소스와 함께', en: 'Nepali-Tibetan steamed dumplings with spicy tomato chutney' }, type: 'world', mood: ['cold', 'happy'], people: ['solo', 'couple'], tags: { ko: ['네팔', '만두', '찜요리'], en: ['Nepali', 'Dumplings', 'Steamed'] }, image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&h=400&fit=crop' },
        { name: { ko: '라따뚜이', en: 'Ratatouille' }, emoji: '🍆', desc: { ko: '프랑스 프로방스 지방의 채소 오븐구이 요리', en: 'French Provencal roasted vegetable medley — elegant & healthy' }, type: 'world', mood: ['happy', 'hot'], people: ['couple'], tags: { ko: ['프랑스', '채식', '오븐요리'], en: ['French', 'Vegetarian', 'Baked'] }, image: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=600&h=400&fit=crop' },
        { name: { ko: '지로스', en: 'Gyros' }, emoji: '🥙', desc: { ko: '그리스식 회전구이 고기를 피타빵에 싸먹는 요리', en: 'Greek rotisserie meat in warm pita with tzatziki & fresh veggies' }, type: 'world', mood: ['happy', 'tired'], people: ['solo'], tags: { ko: ['그리스', '길거리음식', '회전구이'], en: ['Greek', 'Street Food', 'Rotisserie'] }, image: 'https://images.unsplash.com/photo-1561651188-d207bbec4ec3?w=600&h=400&fit=crop' },
        { name: { ko: '나시고렝', en: 'Nasi Goreng' }, emoji: '🍛', desc: { ko: '인도네시아 달콤짭짤한 볶음밥, 달걀프라이 토핑', en: 'Indonesian sweet soy fried rice topped with a sunny-side-up egg' }, type: 'world', mood: ['happy', 'tired'], people: ['solo', 'couple'], tags: { ko: ['인도네시아', '볶음밥', '달콤짭짤'], en: ['Indonesian', 'Fried Rice', 'Sweet-Savory'] }, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop' },
        { name: { ko: '츄로스', en: 'Churros' }, emoji: '🍩', desc: { ko: '스페인식 바삭한 튀김 도넛, 초콜릿 소스와 함께', en: 'Spanish crispy fried dough sticks dipped in thick hot chocolate' }, type: 'world', mood: ['happy', 'stressed'], people: ['solo', 'couple'], tags: { ko: ['스페인', '디저트', '초콜릿'], en: ['Spanish', 'Dessert', 'Chocolate'] }, image: 'https://images.unsplash.com/photo-1624371414361-e670246ebc6c?w=600&h=400&fit=crop' },
        { name: { ko: '감바스', en: 'Gambas al Ajillo' }, emoji: '🦐', desc: { ko: '스페인식 마늘 올리브유에 새우를 끓인 타파스', en: 'Spanish garlic shrimp sizzling in olive oil — classic tapas' }, type: 'world', mood: ['happy', 'cold'], people: ['couple', 'group'], tags: { ko: ['스페인', '타파스', '새우'], en: ['Spanish', 'Tapas', 'Shrimp'] }, image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&h=400&fit=crop' },
        { name: { ko: '빠에야', en: 'Paella' }, emoji: '🥘', desc: { ko: '스페인 발렌시아 지방의 해산물 사프란 쌀요리', en: 'Spanish saffron rice with seafood, a Valencia specialty' }, type: 'world', mood: ['happy', 'cold'], people: ['couple', 'group'], tags: { ko: ['스페인', '쌀요리', '해산물'], en: ['Spanish', 'Rice', 'Seafood'] }, image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=600&h=400&fit=crop' },
        { name: { ko: '퓨전 포케', en: 'Poke Bowl' }, emoji: '🐟', desc: { ko: '하와이식 생선회 덮밥, 아보카도와 특제 소스', en: 'Hawaiian raw fish rice bowl with avocado & sesame dressing' }, type: 'world', mood: ['hot', 'happy'], people: ['solo'], tags: { ko: ['하와이', '생선회', '건강식'], en: ['Hawaiian', 'Raw Fish', 'Healthy'] }, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop' },
        { name: { ko: '봉골레', en: 'Spaghetti Vongole' }, emoji: '🍝', desc: { ko: '이탈리아식 바지락 스파게티, 화이트와인 소스', en: 'Italian clam spaghetti in white wine, garlic & parsley sauce' }, type: 'world', mood: ['happy'], people: ['solo', 'couple'], tags: { ko: ['이탈리아', '해산물', '파스타'], en: ['Italian', 'Seafood', 'Pasta'] }, image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=400&fit=crop' },
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

        document.getElementById('contact-title').textContent = t['contact-title'];
        document.getElementById('contact-desc').textContent = t['contact-desc'];
        document.getElementById('form-label-name').textContent = t['form-label-name'];
        document.getElementById('form-label-email').textContent = t['form-label-email'];
        document.getElementById('form-label-message').textContent = t['form-label-message'];
        document.getElementById('contact-submit').textContent = t['contact-submit'];

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

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('contact-submit');
        const successMsg = document.getElementById('contact-success');
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';

        try {
            const res = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
                contactForm.reset();
                successMsg.textContent = i18n[currentLang]['contact-success'];
                successMsg.style.display = 'block';
                setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
            }
        } catch (_) { /* silent */ }

        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    });
});
