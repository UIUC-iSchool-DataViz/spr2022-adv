Reveal.addEventListener('ready', function() {
    var PaperFigures = ( function( Reveal ){

        var options = Reveal.getConfig()['paper-figures'] || {};
        options.paperjs = options.paperjs || 'https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.0/paper-full.min.js';

        // https://javascript.info/promise-basics
        function loadScript(src) {
            return new Promise(function(resolve, reject) {
                let script = document.createElement('script');
                script.src = src;

                script.onload = () => resolve(script);
                script.onerror = () => reject(new Error("Script load error: " + src));

                document.head.append(script);
                console.log("Appending ", src);
            });
        }

        function loadPaperFigure(path, callback) {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        // The request is done; did it work?
                        if (xhr.status == 200) {
                            // Yes, use `xhr.responseText` to resolve the promise
                            resolve(xhr.responseText);
                        } else {
                            // No, reject the promise
                            reject(xhr);
                        }
                    }
                };
                xhr.open("GET", path);
                xhr.send();
            });
        }

        let promise = loadScript(options.paperjs);
        promise.then( function() {

            function disablePaper(slide) {
                slide.querySelectorAll("canvas[data-paper-scope]").forEach(function(el) {
                    paper.PaperScope.get(el.getAttribute("data-paper-scope")).view.pause();
                });
            };

            function loadAndExecute(scriptId, scope) {
                loadPaperFigure("./" + scriptId + ".js")
                    .then(function(fileData) {
                        console.log("Loading ", scriptId, scope);
                        scope.execute(fileData, {'url': "./" + scriptId + ".js", 'source': fileData});
                        scope.view.play();
                    })
                    .catch(function(xhr) {
                        console.log("Failed to load: ", xhr);
                    });
            }

            function enablePaper(slide) {
                slide.querySelectorAll("canvas[data-paper-script]").forEach(function(el) {
                    scriptId = el.getAttribute("data-paper-script");
                    console.log(el);
                    if (!el.hasAttribute("data-paper-scope")) {
                        scope = new paper.PaperScope();
                        scope.install(el);
                        scope.setup(el);
                        el.setAttribute("data-paper-scope", scope._id);
                        // Now we asynchronously load, which we do in a separate
                        // function for scoping purposes
                        loadAndExecute(scriptId, scope);
                    } else {
                        paper.PaperScope.get(el.getAttribute("data-paper-scope")).view.play();
                    }
                });
            };

            Reveal.addEventListener( 'slidechanged', function(event) {
                disablePaper(event.previousSlide);
                enablePaper(event.currentSlide);
            });
            enablePaper(Reveal.getCurrentSlide());
        });

    })( Reveal );
});
