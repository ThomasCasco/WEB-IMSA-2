(function () {
    const productIndex = [
        'Acorflex',
        'Bondflex',
        'CCDD',
        'CTC',
        'Comander CF',
        'Comander IN',
        'Comander R',
        'Conductores ACCC',
        'Domflex-Al',
        'Edflex',
        'Edflex 200',
        'Electrofil',
        'Etix Acometida',
        'Etix Acometida Concentrico',
        'Etix Distribucion',
        'Etix MT',
        'Flexidur',
        'Flexidur FL',
        'Idasol',
        'Imalal',
        'Imalal XLPE',
        'Imalum',
        'Imalum ASTM B232',
        'Payton HF 1 kV Superflex',
        'Payton HF 1 kV Superflex (Petroleo)',
        'Payton Soltix',
        'Payton TPU (SHD-G-GC Type)',
        'Payton TPU Diesel Locomotive',
        'Payton TPU Superflex (Mineria)',
        'Payton TPU Superflex (Petroleo)',
        'Payton Torsionable',
        'Payton XLPE 13,2 kV Cat I Unipolares',
        'Payton XLPE 13,2 kV Cat II Tripolares',
        'Payton XLPE 13,2 kV Cat II Unipolares',
        'Payton XLPE 33 kV Cat I Tripolares',
        'Payton XLPE 33 kV Cat I Unipolares',
        'Payton XLPE 66 kV Unipolares',
        'Payton XLPE Self Supporting',
        'Planchuelas Aisladas',
        'Planchuelas Desnudas',
        'Planchuelas Esmaltadas',
        'Planchuelas Forradas',
        'Plastix CF',
        'Plastix CH',
        'Plastix HF',
        'Plastix R',
        'Plastix X',
        'Procompact',
        'Redondos Forrados',
        'Soldafil'
    ];

    const characteristicTerms = [
        'cobre',
        'aluminio',
        'pvc',
        'xlpe',
        'lszh',
        'libre de halogenos',
        'anti flama',
        'media tension',
        'alta tension',
        'superflex',
        'solar',
        'renovable',
        'mineria',
        'petroleo y gas',
        'instrumentacion',
        'linea aerea',
        'acsr',
        'accc',
        'domiciliaria',
        'industrial'
    ];

    const normalize = (text) => {
        return (text || '')
            .toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
    };

    const escapeHTML = (text) => {
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };

    const buildHeaderProductSearch = () => {
        if (!document.querySelector('header')) {
            return;
        }

        if (document.getElementById('imsa-header-product-search')) {
            return;
        }

        const desktopNav = document.querySelector('header .hidden.md\\:flex');
        const mobileNavContainer = document.querySelector('header nav .flex.justify-between.items-center');

        if (!desktopNav || !mobileNavContainer) {
            return;
        }

        const style = document.createElement('style');
        style.textContent = [
            '.imsa-product-search{position:relative;display:flex;align-items:center;gap:.35rem;background:rgba(255,255,255,.94);border:1px solid rgba(0,0,0,.14);border-radius:999px;padding:.2rem .28rem .2rem .75rem;min-width:260px;max-width:360px}',
            '.imsa-product-search:focus-within{border-color:#e31837;box-shadow:0 0 0 3px rgba(227,24,55,.14)}',
            '.imsa-product-search-input{border:0;background:transparent;outline:none;min-width:0;width:100%;font-size:.82rem;color:#111}',
            '.imsa-product-search-input::placeholder{color:rgba(0,0,0,.5)}',
            '.imsa-product-search-btn{border:0;background:#e31837;color:#fff;border-radius:999px;width:1.9rem;height:1.9rem;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:background .2s ease}',
            '.imsa-product-search-btn:hover{background:#b31229}',
            '.imsa-product-search-mobile-btn{border:0;background:transparent;color:#111;width:2.2rem;height:2.2rem;display:none;align-items:center;justify-content:center;border-radius:.55rem;cursor:pointer}',
            '.imsa-product-search-mobile-btn:hover{background:rgba(227,24,55,.1);color:#e31837}',
            '.imsa-product-search-btn:focus-visible,.imsa-product-search-input:focus-visible{outline:none}',
            '.imsa-product-search-suggestions{position:absolute;left:0;right:0;top:calc(100% + .5rem);background:#fff;border:1px solid rgba(0,0,0,.12);border-radius:.9rem;box-shadow:0 18px 35px rgba(0,0,0,.16);padding:.3rem;max-height:300px;overflow:auto;display:none;z-index:60}',
            '.imsa-product-search-suggestions.visible{display:block}',
            '.imsa-product-search-item{display:block;width:100%;border:0;background:transparent;text-align:left;padding:.5rem .6rem;border-radius:.6rem;color:#111;font-size:.82rem;cursor:pointer;transition:background .16s ease}',
            '.imsa-product-search-item:hover,.imsa-product-search-item.active{background:rgba(227,24,55,.12)}',
            '.imsa-product-search-item-label{font-weight:600}',
            '@media (max-width: 900px){.imsa-product-search{display:none}.imsa-product-search-mobile-btn{display:flex}}'
        ].join('');
        document.head.appendChild(style);

        const params = new URLSearchParams(window.location.search);
        const initialQuery = params.get('buscar') || '';

        const form = document.createElement('form');
        form.id = 'imsa-header-product-search';
        form.className = 'imsa-product-search';
        form.setAttribute('role', 'search');
        form.setAttribute('aria-label', 'Buscar productos');
        form.innerHTML = [
            '<input class="imsa-product-search-input" type="search" name="buscar" placeholder="Buscar productos..." aria-label="Buscar productos" autocomplete="off">',
            '<button class="imsa-product-search-btn" type="submit" aria-label="Buscar">',
            '  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
            '</button>',
            '<div class="imsa-product-search-suggestions" role="listbox" aria-label="Sugerencias de productos"></div>'
        ].join('');

        const input = form.querySelector('input[name="buscar"]');
        const suggestionsBox = form.querySelector('.imsa-product-search-suggestions');
        let currentSuggestions = [];
        let activeSuggestionIndex = -1;

        const goToSearchResults = (value) => {
            const query = (value || '').trim();
            const target = query
                ? `productos.html?buscar=${encodeURIComponent(query)}#subcategory-page`
                : 'productos.html#productos';
            window.location.href = target;
        };

        const hideSuggestions = () => {
            if (suggestionsBox) {
                suggestionsBox.classList.remove('visible');
                suggestionsBox.innerHTML = '';
            }
            currentSuggestions = [];
            activeSuggestionIndex = -1;
        };

        const renderSuggestions = (rawQuery) => {
            if (!input || !suggestionsBox) {
                return;
            }

            const query = normalize(rawQuery);
            if (!query) {
                hideSuggestions();
                return;
            }

            const productMatches = productIndex
                .map((name) => {
                    const normalizedName = normalize(name);
                    let score = 0;

                    if (normalizedName.startsWith(query)) {
                        score = 3;
                    } else if (normalizedName.includes(query)) {
                        score = 2;
                    }

                    return { label: name, value: name, type: 'product', score: score };
                })
                .filter((item) => item.score > 0);

            const featureMatches = characteristicTerms
                .map((term) => {
                    const normalizedTerm = normalize(term);
                    let score = 0;

                    if (normalizedTerm.startsWith(query)) {
                        score = 2;
                    } else if (normalizedTerm.includes(query)) {
                        score = 1;
                    }

                    return {
                        label: `Caracteristica: ${term}`,
                        value: term,
                        type: 'feature',
                        score: score
                    };
                })
                .filter((item) => item.score > 0);

            currentSuggestions = productMatches
                .concat(featureMatches)
                .sort((a, b) => {
                    if (b.score !== a.score) {
                        return b.score - a.score;
                    }
                    return a.label.localeCompare(b.label);
                })
                .slice(0, 8);

            if (!currentSuggestions.length) {
                hideSuggestions();
                return;
            }

            activeSuggestionIndex = -1;
            suggestionsBox.innerHTML = currentSuggestions
                .map((item, index) => {
                    return '<button type="button" class="imsa-product-search-item" role="option" data-index="' + index + '"><span class="imsa-product-search-item-label">' + escapeHTML(item.label) + '</span></button>';
                })
                .join('');
            suggestionsBox.classList.add('visible');
        };

        const highlightActiveSuggestion = () => {
            if (!suggestionsBox) {
                return;
            }

            const items = suggestionsBox.querySelectorAll('.imsa-product-search-item');
            items.forEach((item, index) => {
                if (index === activeSuggestionIndex) {
                    item.classList.add('active');
                    item.scrollIntoView({ block: 'nearest' });
                } else {
                    item.classList.remove('active');
                }
            });
        };

        if (input) {
            input.value = initialQuery;

            input.addEventListener('input', (event) => {
                renderSuggestions(event.target.value);
            });

            input.addEventListener('focus', () => {
                renderSuggestions(input.value);
            });

            input.addEventListener('keydown', (event) => {
                if (!currentSuggestions.length) {
                    return;
                }

                if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    activeSuggestionIndex = (activeSuggestionIndex + 1) % currentSuggestions.length;
                    highlightActiveSuggestion();
                    return;
                }

                if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    activeSuggestionIndex = (activeSuggestionIndex - 1 + currentSuggestions.length) % currentSuggestions.length;
                    highlightActiveSuggestion();
                    return;
                }

                if (event.key === 'Escape') {
                    hideSuggestions();
                    return;
                }

                if (event.key === 'Enter' && activeSuggestionIndex >= 0) {
                    event.preventDefault();
                    const selected = currentSuggestions[activeSuggestionIndex];
                    input.value = selected.value;
                    hideSuggestions();
                    goToSearchResults(selected.value);
                }
            });

            input.addEventListener('blur', () => {
                window.setTimeout(() => {
                    hideSuggestions();
                }, 120);
            });
        }

        if (suggestionsBox) {
            suggestionsBox.addEventListener('mousedown', (event) => {
                const button = event.target.closest('.imsa-product-search-item');
                if (!button || !input) {
                    return;
                }

                event.preventDefault();
                const index = Number(button.getAttribute('data-index'));
                const selected = currentSuggestions[index];
                if (!selected) {
                    return;
                }

                input.value = selected.value;
                hideSuggestions();
                goToSearchResults(selected.value);
            });
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const rawQuery = input ? input.value : '';
            const query = (rawQuery || '').trim();
            hideSuggestions();
            goToSearchResults(query);
        });

        const contactLink = desktopNav.querySelector('a[href="contacto.html"]');
        if (contactLink) {
            desktopNav.insertBefore(form, contactLink);
        } else {
            desktopNav.appendChild(form);
        }

        const mobileButton = document.createElement('button');
        mobileButton.type = 'button';
        mobileButton.className = 'imsa-product-search-mobile-btn';
        mobileButton.setAttribute('aria-label', 'Buscar productos');
        mobileButton.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';
        mobileButton.addEventListener('click', () => {
            const typed = window.prompt('Buscar producto');
            if (typed === null) {
                return;
            }
            goToSearchResults(typed);
        });

        const menuButton = mobileNavContainer.querySelector('button.md\\:hidden');
        if (menuButton) {
            mobileNavContainer.insertBefore(mobileButton, menuButton);
        } else {
            mobileNavContainer.appendChild(mobileButton);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildHeaderProductSearch);
    } else {
        buildHeaderProductSearch();
    }
})();
