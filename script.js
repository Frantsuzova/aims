// Ожидаем полной загрузки контента страницы
document.addEventListener("DOMContentLoaded", () => {
  // Header Underline https://codepen.io/alphardex/pen/JjoqbNP
  let underlineMenuItems = document.querySelectorAll(".underline-menu li");
  if (underlineMenuItems.length > 0) {
      underlineMenuItems[0].classList.add("active");
      underlineMenuItems.forEach(item => {
          item.addEventListener("click", () => {
              underlineMenuItems.forEach(item => item.classList.remove("active"));
              item.classList.add("active");
          });
      });
  }

  // Full Page Burger Navigation https://codepen.io/alphardex/pen/NWPBwYe
  let burgerMenuToggle = document.querySelector("#burger-toggle");
  let burgerMenuLinks = document.querySelectorAll(".burger-nav li a");
  burgerMenuLinks.forEach(link => {
      link.addEventListener("click", () => {
          if (burgerMenuToggle) {
              burgerMenuToggle.checked = false;
          }
      });
  });

 
  // Cross Bar Glitch Text https://codepen.io/alphardex/pen/VwLLLNG
  const random = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
  let crossBarGlitchTexts = document.querySelectorAll(".cross-bar-glitch");
  crossBarGlitchTexts.forEach(text => {
      let content = text.textContent;
      text.textContent = "";
      let slice = text.dataset.slice;
      let glitchText = document.createElement("div");
      glitchText.className = "glitch";
      glitchText.style.setProperty("--slice-count", slice);
      for (let i = 0; i <= Number(slice); i++) {
          let span = document.createElement("span");
          span.textContent = content;
          span.style.setProperty("--i", `${i + 1}`);
          if (i !== Number(slice)) {
              span.style.animationDelay = `${800 + random(100, 300)}ms`;
          }
          glitchText.append(span);
      }
      text.appendChild(glitchText);
      let bars = document.createElement("div");
      bars.className = "bars";
      for (let i = 0; i < 5; i++) {
          let bar = document.createElement("div");
          bar.className = "bar";
          bars.append(bar);
      }
      text.append(bars);
  });

  // Staggered Rise In Text https://codepen.io/alphardex/pen/qBEmGbw
  let staggeredRiseInTexts = document.querySelectorAll(".staggered-rise-in");
  staggeredRiseInTexts.forEach(text => {
      let letters = text.textContent.split("");
      text.textContent = "";
      letters.forEach((letter, i) => {
          let span = document.createElement("span");
          span.textContent = letter;
          span.style.animationDelay = `${i / 20}s`;
          text.append(span);
      });
  });

  // Observe the elements which have animations to fire
  let observer = new IntersectionObserver(
      entries => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add("active");
              }
          });
      },
      { rootMargin: "0px 0px -140px" }
  );

  let titles = document.querySelectorAll(".titles > *");
  titles.forEach(title => observer.observe(title));
  let paragraphs = document.querySelectorAll("p");
  paragraphs.forEach(p => observer.observe(p));
  let profileCards = document.querySelectorAll(".card");
  profileCards.forEach(profileCard => observer.observe(profileCard));
  let timeline = document.querySelector(".timeline");
  if (timeline) observer.observe(timeline);
  let marker = document.querySelector(".marker");
  if (marker) observer.observe(marker);
  let placeName = document.querySelector(".place-name");
  if (placeName) observer.observe(placeName);

  let sponsorList = document.querySelectorAll(".sponsors-list li");
  sponsorList.forEach(sponsor => observer.observe(sponsor));

 
});

// Логика для переключателя языков
/*
document.addEventListener("DOMContentLoaded", () => {
    const langSwitcher = document.querySelector(".language-switcher");
    const langLinks = langSwitcher.querySelectorAll("a");
  
    langLinks.forEach(link => {
        link.addEventListener("click", event => {
          event.preventDefault();
          const lang = link.getAttribute("data-lang");
      
          // Список поддерживаемых языков
          const supportedLangs = ["ru", "sr", "en"];
      
          if (supportedLangs.includes(lang)) {
            // Переключение на соответствующую страницу
            window.location.href = lang === "ru" ? "index.html" : `index-${lang}.html`;
          } else {
            // Если язык не поддерживается, остаемся на текущей странице
           // showErrorPopup("Error: The selected language is not supported!");
          }
        });
      });
  });
  */
 // Логика для открытия попапов
document.querySelectorAll("[data-popup]").forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault(); // Предотвращаем переход по ссылке
      const popupId = button.getAttribute("data-popup");
      const popup = document.getElementById(popupId);
      if (popup) {
        popup.classList.remove("hidden");
        popup.style.display = "flex"; // Показываем попап
      }
    });
  });
  
  // Логика для закрытия попапов
  document.querySelectorAll(".popup-close").forEach(closeBtn => {
    closeBtn.addEventListener("click", () => {
      const popup = closeBtn.closest(".popup");
      if (popup) {
        popup.classList.add("hidden");
        popup.style.display = "none"; // Скрываем попап
      }
    });
  });
  
  // Закрытие попапа при клике вне его области
  document.addEventListener("click", event => {
    const popups = document.querySelectorAll(".popup");
    popups.forEach(popup => {
      if (!popup.contains(event.target) && !event.target.closest("[data-popup]")) {
        popup.classList.add("hidden");
        popup.style.display = "none";
      }
    });
  });

  //попап-ссылка - закрытие
  document.querySelectorAll('.popup a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    const popup = link.closest('.popup');
    if (!popup) return;

    popup.classList.add('hidden');
    popup.style.display = 'none';
  });
});

  

//letters
function submitForm(event) {
    event.preventDefault(); // Прекращаем стандартное поведение формы (перенаправление)

    const form = event.target;
    const formData = new FormData(form);

    // Отправляем данные в Formspree
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            // Если отправка успешна, показываем попап и очищаем форму
            showPopup();
            clearForm(form); // Очищаем форму
        } else {
            alert("Ошибка при отправке сообщения.");
        }
    })
    .catch(error => {
        alert("Ошибка при отправке сообщения.");
    });
}

// Функция для отображения попапа
function showPopup() {
    const popup = document.getElementById("popup-success");
    popup.style.display = "block";
}

// Функция для закрытия попапа
function closePopup() {
    const popup = document.getElementById("popup-success");
    popup.style.display = "none";
}

// Функция для очистки данных формы
function clearForm(form) {
    form.reset(); // Метод reset() очищает все поля формы
}

// Функция для отслеживания активного пункта меню при прокрутке
function setActiveMenu() {
    const menuItems = document.querySelectorAll('.underline-menu li');
    let activeFound = false;

    menuItems.forEach(li => {
        li.classList.remove('active');
    });

    menuItems.forEach(li => {
        const id = li.querySelector('a').getAttribute('href').slice(1);
        const section = document.getElementById(id);
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const mid = window.innerHeight * 0.35; // центр смещён — проверено

        if (rect.top <= mid && rect.bottom >= mid) {
            li.classList.add('active');
            activeFound = true;
        }
    });

    // если ни одна секция не попала — НИЧЕГО не выделяем
}

// Добавляем обработчик события для прокрутки
window.addEventListener('scroll', setActiveMenu);

// Вызываем функцию при загрузке страницы для корректного отображения
document.addEventListener('DOMContentLoaded', setActiveMenu);


// определяем язык
/*
document.addEventListener("DOMContentLoaded", () => {
  const userLang = (navigator.language || navigator.userLanguage || "").slice(0, 2).toLowerCase();
  const supportedLangs = ["ru", "en", "fr"];
  const isRoot = location.pathname === "/" || location.pathname.endsWith("index.html");

  


  
  const langSwitcher = document.querySelector(".language-switcher");
  const langLinks = langSwitcher.querySelectorAll("a");

  function updateActiveLang() {
    const currentLang = localStorage.getItem('activeLang') || document.documentElement.lang;
    langLinks.forEach(link => {
      link.classList.toggle("active", link.dataset.lang === currentLang);
    });
  }

  updateActiveLang();

  langLinks.forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    const lang = link.dataset.lang;
    localStorage.setItem('activeLang', lang);
    sessionStorage.setItem('manualLangSwitch', 'true');
    document.documentElement.lang = lang;
    window.location.href = lang === "ru" ? "index.html" : `index-${lang}.html`;
  });
});

});

*/





// === AIMS GALLERY: вертикальные = 2×гор + gap (no-crop) ===
(() => {
  function syncVerticalHeights() {
    const g = document.querySelector('.aims-gallery');
    if (!g) return;

    // row-gap в пикселях
    const gap = parseFloat(getComputedStyle(g).rowGap) || 0;

    // эталонная горизонтальная карточка
    const h = g.querySelector('.frame.h');
    if (!h) return;

    // фактическая ВНЕШНЯЯ высота (border-box) горизонтальной
    const hBox = h.getBoundingClientRect().height;

    // целевая ВНЕШНЯЯ высота для вертикальных
    const target = Math.round(hBox * 2 + gap);

    // применяем: задаём явную высоту border-box
    g.querySelectorAll('.frame.v').forEach(v => {
      v.style.height = target + 'px';
    });
  }

  // ждать картинки, чтобы размеры были корректны
  function whenImagesReady(root, cb) {
    const imgs = root.querySelectorAll('img');
    if (!imgs.length) return cb();
    let left = imgs.length;
    const done = () => (--left === 0) && cb();
    imgs.forEach(img => img.complete ? done() : img.addEventListener('load', done, { once: true }));
  }

  function init() {
    const g = document.querySelector('.aims-gallery');
    if (!g) return;
    whenImagesReady(g, syncVerticalHeights);
    // пересчитывать при ресайзе
    let raf;
    window.addEventListener('resize', () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(syncVerticalHeights);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  // на всякий случай ещё после полной загрузки
  window.addEventListener('load', syncVerticalHeights);
})();

// === Переключение городов на таймлайне ===
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.city-tabs button');
  const timelines = document.querySelectorAll('.dates-timeline');

  if (!buttons.length || !timelines.length) return; // ничего не делаем, если не нашли элементы

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // активная кнопка
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const city = button.dataset.city;
      // показать нужный блок дат
      timelines.forEach(timeline => {
        timeline.style.display = timeline.id.includes(city) ? 'flex' : 'none';
      });
    });
  });
});



document.querySelectorAll(".registration-switch button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".registration-switch button")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const city = btn.dataset.city;

      document
        .querySelectorAll(".registration-card")
        .forEach((card) => {
          card.classList.toggle("hidden", card.dataset.city !== city);
        });
    });
  });



// ===== ОГРАНИЧЕНИЕ ВЕРТИКАЛЬНОГО МЕНЮ ПЕРЕД ГАЛЕРЕЕЙ =====
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".underline-menu");
  const gallery = document.querySelector(".aims-gallery");

  if (!menu || !gallery) return;

  const BASE_TOP_PERCENT = 27;                // как в CSS
  const GAP_BEFORE_GALLERY = 35;             // 20px до галереи

  function updateSideMenu() {
    const viewportH = window.innerHeight;
    const scrollY = window.scrollY;

    const baseTopPx = viewportH * (BASE_TOP_PERCENT / 100);
    const menuHeight = menu.offsetHeight;

    // где был бы низ меню, если top = 27%
    const menuBottomIfBase = scrollY + baseTopPx + menuHeight;

    // абсолютный top галереи
    const galleryTopAbs = gallery.getBoundingClientRect().top + scrollY;

    // линия, выше которой меню НЕ должно заезжать (-20px)
    const stopLine = galleryTopAbs - GAP_BEFORE_GALLERY;

    if (menuBottomIfBase >= stopLine) {
      // фиксируем меню ровно так, чтобы низ был на stopLine
      const newTopPx = stopLine - scrollY - menuHeight;
      menu.style.top = newTopPx + "px";
    } else {
      // обычное положение
      menu.style.top = BASE_TOP_PERCENT + "%";
    }
  }

  updateSideMenu();
  window.addEventListener("scroll", updateSideMenu);
  window.addEventListener("resize", updateSideMenu);
});



// Цветные фото у спикеров при hover
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.speaker-photo').forEach(img => {
    const original = img.src;

    // определяем расширение
    const extMatch = original.match(/\.(jpg|jpeg|png|webp)$/i);
    if (!extMatch) return;

    const ext = extMatch[0]; // .jpg / .jpeg
    const base = original.replace(ext, ""); // путь без расширения
    const color = base + "_color" + ext; // добавляем _color

    img.dataset.orig = original;
    img.dataset.color = color;

    img.addEventListener('mouseenter', () => {
      img.src = img.dataset.color;
    });

    img.addEventListener('mouseleave', () => {
      img.src = img.dataset.orig;
    });
  });
});



document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".dates-timeline").forEach(tl => {
        const items = [...tl.querySelectorAll(".timeline-item")];

        const start = items.findIndex(i => i.dataset.key === "peer_review");
        const end   = items.findIndex(i => i.dataset.key === "schedule_live");

        if (start === -1 || end === -1 || end < start) return;

        const collapsed = document.createElement("div");
        collapsed.className = "timeline-collapsed";

        tl.insertBefore(collapsed, items[start]);

        for (let i = start; i <= end; i++) {
            collapsed.appendChild(items[i]);
        }

        const btn = document.createElement("button");
        btn.className = "timeline-toggle";
        btn.textContent = "...show more";
        tl.insertBefore(btn, collapsed);

        let open = false;

        btn.addEventListener("click", () => {
            open = !open;

            if (open) {
        collapsed.classList.add("open");

        // позволяем браузеру применить класс
        requestAnimationFrame(() => {
            const fullHeight = collapsed.scrollHeight;
            collapsed.style.maxHeight = fullHeight + "px";
        });

        btn.textContent = "hide";
        btn.classList.add("open");

    } else {
        collapsed.style.maxHeight = "0px";
        collapsed.classList.remove("open");
        btn.textContent = "show more";
        btn.classList.remove("open");
    }
});
    });
});



// === SUBSCRIBE FORM ===
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("subscribe-form");
  const popup = document.getElementById("subscribe-popup");
  const closeBtn = popup.querySelector(".popup-close");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { "Accept": "application/json" }
    });

    if (response.ok) {
      popup.classList.remove("hidden");
      popup.style.display = "flex";
      form.reset();
    }
  });

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
    popup.classList.add("hidden");
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
      popup.classList.add("hidden");
    }
  });
});



