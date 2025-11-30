        function goBack() {
            window.history.back();
        }

        document.addEventListener('click', function (event) {
            if (event.target === document.body) {
                goBack();
            }
        });