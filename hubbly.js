/**
 * Hubbly JS is a social icon utility plugin that allows web developers
 * to easily place awesome social icons on their website or web applications
 * without searching and combing through the internet for social icons and
 * placing them on the website. 
 * 
 * Interesting aspect of Hubbly Js is the behavioural animation added to the
 * the social icons. And the API is simple to implement. 
 * 
 * Hubbly Js is Licensed under the MIT License.
 * 
 */
;
(function(global) {
    var CONFIG = {

        FONTAWESOME: "css/fontAwesome/css/font-awesome.css",
        HOVERCSS: "css/hover-min.css",
        HUBBLYCSS: "css/hubbly.css",

        CSSPATHS: function() {
            return [this.FONTAWESOME, this.HUBBLYCSS, this.HOVERCSS];
        },
        target: true,
        vertical: false,
        behaviour: "push",
        color: "darkgray",
    };

    var Utility = {
        loadCSS: function(paths) {
            var head = document.getElementsByTagName('head')[0];
            paths.forEach(path => {
                var link = document.createElement('link');
                link.setAttribute('type', 'text/css');
                link.setAttribute('rel', "stylesheet");
                link.setAttribute('href', path);
                head.appendChild(link);
            });
        }
    };

    var Hubbly = function(el, options) {

        var el = el || "";
        return new Hubbly.fn.init(el, options);
    };

    Hubbly.fn = Hubbly.prototype = {
        pairedHandles: [],
        matchUp: function(arr1, arr2) {
            return this.pairUp(arr1, arr2);
        },

        pairUp: function(arr1, arr2) {
            var uniquePairs = [];
            if (arr2.length === 1) {
                arr1.forEach(element => {
                    arr2.forEach(secondElement => {
                        var pair = [element, secondElement];
                        uniquePairs.indexOf(pair) === 1 ? uniquePairs.pop(pair) : uniquePairs.push(pair);
                    });
                });
            } else if (arr2.length > 1) {
                for (var i = 0; i < arr1.length; i++) {
                    var pair = [arr1[i], arr2[i]];
                    uniquePairs.indexOf(pair) === 1 ? uniquePairs.pop(pair) : uniquePairs.push(pair);
                }
            }
            this.pairedHandles = uniquePairs;
            return this.pairedHandles;
        },

        linksConstructor: function(arr) {
            var links = [],
                handles = [],
                media = [];
            arr.forEach(e => {
                links.push("https://" + e[0] + ".com/" + e[1]);
                handles.push(e[1]);
                media.push(e[0]);
            });
            return [links, media, handles];
        },

        orient: function(o) {
            return o ? "vertical" : "false";
        },
        formatLinks: function(el, arr, options) {
            var linksArray = arr[0],
                mediaArray = arr[1],
                handlesArray = arr[2];

            var ul = document.createElement("ul");
            ul.setAttribute('class', 'hubbly');
            var output = "";
            el.appendChild(ul);
            for (var i = 0; i < linksArray.length; i++) {
                output += "<li class='hubblite hvr-" + options.behaviour + ' ' + this.orient(options.vertical) + " " + options.color + " '><a class='hubblink' target='" + options.target + "' href='" + linksArray[i] + "' alt='" + linksArray[i] + "'><i aria-hidden='true' class='fa fa-" + options.size + "x fa-" + mediaArray[i] + "'></i></a></li>";
            }
            return ul.innerHTML = output;
        },
    }

    Hubbly.fn.init = function(el, options) {
        //loading css files
        Utility.loadCSS(CONFIG.CSSPATHS());

        //Initialize options
        this.options = {
            media: options.media || "facebook",
            handles: options.handles || "",
            size: options.size || "2",
            shape: options.shape || "circle",
            target: options.target || CONFIG.target,
            vertical: options.vertical || CONFIG.vertical,
            behaviour: options.behaviour || CONFIG.behaviour,
            color: options.color || CONFIG.color
        }

        if (typeof this.options === 'object') {
            if (this.options.hasOwnProperty('media') && this.options.hasOwnProperty('handles')) {
                var socialMedia = this.options.media.split(',');
                var handles = this.options.handles.split(',');
                var hubbled = Hubbly.fn.matchUp(socialMedia, handles);
                var el = document.querySelector(el);

                if (el !== null && typeof(el) !== undefined) {
                    Hubbly.fn.formatLinks(el, Hubbly.fn.linksConstructor(hubbled), this.options);
                } else {
                    throw console.error("Invalid selector: Probably due to Non-existence of element in DOM");
                }
            }
        }
    }
    global.$hubbly = Hubbly;
}(window));