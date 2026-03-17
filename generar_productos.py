import json

def generar_paginas():
    print("Iniciando generación de páginas de productos...")
    
    # 1. Cargar el JSON de datos
    try:
        with open('productos.json', 'r', encoding='utf-8') as f:
            productos = json.load(f)
    except Exception as e:
        print(f"Error al leer productos.json: {e}")
        return

    # 2. Cargar la plantilla HTML
    try:
        with open('plantilla_producto.html', 'r', encoding='utf-8') as f:
            template = f.read()
    except Exception as e:
        print(f"Error al leer plantilla_producto.html: {e}")
        return

    # 3. Generar una página HTML por cada producto
    for slug, data in productos.items():
        html = template
        
        # Textos básicos
        html = html.replace('{{ title }}', data.get('title', ''))
        html = html.replace('{{ subtitle }}', data.get('subtitle', ''))
        html = html.replace('{{ category }}', data.get('category', ''))
        html = html.replace('{{ description }}', data.get('description', ''))
        html = html.replace('{{ img }}', data.get('img', ''))
        html = html.replace('{{ aplicaciones }}', data.get('aplicaciones', ''))
        
        # Badges (Etiquetas)
        badges_html = ''
        for badge in data.get('badges', []):
            badges_html += f'''<span class="feature-badge">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                {badge}
                            </span>\n'''
        html = html.replace('{{ badges_html }}', badges_html)
        
        # Características (Li)
        carac_html = ''
        for c in data.get('caracteristicas', []):
            carac_html += f'<li class="flex gap-2"><div class="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div><span>{c}</span></li>\n'
        html = html.replace('{{ caracteristicas_html }}', carac_html)
        
        # Normas
        normas_html = ''
        for n in data.get('normas', []):
            normas_html += f'<li class="flex gap-2"><div class="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></div><span class="font-medium">{n}</span></li>\n'
        html = html.replace('{{ normas_html }}', normas_html)
        
        # PDF Button
        pdf = data.get('pdf', '')
        if pdf:
            pdf_html = f'''<a id="download-btn" href="{pdf}" target="_blank" class="border-2 border-gray-200 text-gray-800 px-8 py-3 rounded-full font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Descargar Ficha Técnica
                        </a>'''
        else:
            pdf_html = ''
        html = html.replace('{{ download_btn_html }}', pdf_html)
        
        # 4. Guardar archivo final físico
        output_filename = f"producto-{slug}.html"
        with open(output_filename, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"✔️ Creado exitosamente: {output_filename}")

    print("¡Listo! Todas las páginas han sido generadas y optimizadas para SEO.")

if __name__ == "__main__":
    generar_paginas()