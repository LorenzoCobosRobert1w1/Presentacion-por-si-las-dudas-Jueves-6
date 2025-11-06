document.addEventListener("DOMContentLoaded", () => {
    const btnNosotros = document.getElementById("btnNosotros");
    const btnConsultas = document.getElementById("btnConsultas");
    const seccionNosotros = document.getElementById("sobre-nosotros");
    const seccionConsultas = document.getElementById("consultas");
    const botonesEjecutar = document.querySelectorAll(".btn-ejecutar");
    const botonesEnunciado = document.querySelectorAll(".btn-enunciado");
    const themeToggle = document.getElementById("themeToggle");
    const consultas = document.querySelectorAll(".consulta");
        
        let stockPochoclos = 20;
    const btnPorque = document.getElementById("btnPorque");
    const seccionPorque = document.getElementById("porque-elegirnos");
    function highlightSQL() {
        const keywords = /\b(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|GROUP BY|HAVING|ORDER BY|JOIN|ON|AS|AND|OR|IN|BETWEEN|LIKE|IS|NULL|CREATE|VIEW|PROCEDURE|BEGIN|END|EXEC|UNION|DISTINCT|COUNT|SUM|AVG|MIN|MAX|PRINT|RETURN|IF|ELSE|CONCAT|REPLACE|YEAR|DATEADD|GETDATE)\b/gi;
        const types = /\b(VARCHAR|INT|DECIMAL|DATE|DATETIME|OUTPUT)\b/gi;
        const strings = /'([^']*)'/g;
        const numbers = /\b\d+\b/g;
        const variables = /@\w+\b/g;
        const functions = /\b(STR|YEAR|COUNT|SUM|AVG|DATEADD|GETDATE|CONCAT|REPLACE|DISTINCT)\b/gi;

        document.querySelectorAll('.consulta pre').forEach(pre => {
            let html = pre.textContent;
            html = html.replace(keywords, match => `<span class="keyword">${match}</span>`);
            html = html.replace(types, match => `<span class="type">${match}</span>`);
            html = html.replace(strings, match => `<span class="string">${match}</span>`);
            html = html.replace(numbers, match => `<span class="number">${match}</span>`);
            html = html.replace(variables, match => `<span class="variable">${match}</span>`);
            html = html.replace(functions, match => `<span class="function">${match}</span>`);
            pre.innerHTML = html;
        });
    }

 
    btnNosotros.addEventListener("click", () => {
        seccionNosotros.classList.remove("hidden");
        seccionConsultas.classList.add("hidden");
        seccionPorque.classList.add("hidden"); 
    });

    btnConsultas.addEventListener("click", () => {
        seccionNosotros.classList.add("hidden");
        seccionConsultas.classList.remove("hidden");
        seccionPorque.classList.add("hidden"); 
        window.scrollTo({ top: 0, behavior: "smooth" });
    });


    btnPorque.addEventListener("click", () => {
        seccionNosotros.classList.add("hidden");
        seccionConsultas.classList.add("hidden");
        seccionPorque.classList.remove("hidden"); 
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    botonesEnunciado.forEach(boton => {
        boton.addEventListener("click", () => {
            const enunciado = boton.nextElementSibling;
            enunciado.classList.toggle("hidden");
            boton.textContent = enunciado.classList.contains("hidden")
                ? "Mostrar Enunciado"
                : "Ocultar Enunciado";
        });
    });

    botonesEjecutar.forEach(boton => {
        boton.addEventListener("click", () => {
            const imgSrc = boton.getAttribute("data-img");
            const resultado = boton.nextElementSibling;
            resultado.innerHTML = `<img src="${imgSrc}" alt="Resultado de la consulta">`;
            setTimeout(() => {
                const img = resultado.querySelector('img');
                if (img) img.classList.add('visible');
            }, 50);
        });
    });

      
        const stockDisplay = document.getElementById('stock-pochoclos');
        const cantidadInput = document.getElementById('cantidad-pochoclos');
        const addBtn = document.getElementById('add-to-invoice');
        const finalizeBtn = document.getElementById('finalize-invoice');
        const invoiceList = document.getElementById('invoice-list');
        const errorBox = document.getElementById('error-box');

        let pendingPochoclos = 0;

        function updateStockDisplay() {
            if (!stockDisplay) return;
            stockDisplay.textContent = stockPochoclos + (pendingPochoclos > 0 ? ` (Pendiente: ${pendingPochoclos})` : '');
        }

        function showErrorMessage(msg) {
            if (!errorBox) return;
            errorBox.textContent = `Error en la base de datos. ERRORMESSAGE (${msg})`;
            errorBox.classList.remove('hidden');
            setTimeout(() => {
                errorBox.classList.add('hidden');
            }, 5000);
        }

        if (updateStockDisplay) updateStockDisplay();

        if (addBtn) {
            addBtn.addEventListener('click', () => {
                const qty = parseInt(cantidadInput.value, 10) || 0;
                if (qty <= 0) return;
         
                pendingPochoclos += qty;
                const li = document.createElement('li');
                li.textContent = `Pochoclos x ${qty}`;
                invoiceList.appendChild(li);
                updateStockDisplay();
            });
        }

        if (finalizeBtn) {
            finalizeBtn.addEventListener('click', () => {
                if (pendingPochoclos <= 0) {
            
                    invoiceList.innerHTML = '';
                    return;
                }
                if (pendingPochoclos > stockPochoclos) {
                    const raiserrorMsg = 'ERROR DE INVENTARIO: Stock insuficiente para completar la transacción. Venta revertida.';
                    showErrorMessage(raiserrorMsg);
                    return;
                }
         
                stockPochoclos -= pendingPochoclos;
                pendingPochoclos = 0;
                updateStockDisplay();
                invoiceList.innerHTML = '';
            });
        }


    themeToggle.addEventListener("click", () => {
        
        consultas.forEach(consulta => {
            consulta.classList.toggle('light-theme');
          
            highlightSQL();
        });
     
        const icon = themeToggle.querySelector('i');
        if (icon.classList.contains('bi-moon-fill')) {
            icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
        } else {
            icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
        }
    });

    
    highlightSQL();
});

