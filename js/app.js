// Set screen size breakpoints
skel.breakpoints({
    xlarge: "(min-width: 1680px)",
    large: "(min-width: 1280px)",
    medium: "(max-width: 980px)",
    small: "(max-width: 736px)",
    xsmall: "(max-width: 480px)"
  });
  
  function readTextFile(file, callback) {
    let rawFile = new XMLHttpRequest();
  
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status === 0) {
          let allText = rawFile.responseText;
          callback(allText);
        }
      }
    };
  
    rawFile.send(null);
  }
  
  function addNames() {
    let fileDisplayArea = document.getElementById("names");
  
    readTextFile("http://localhost/frans/menolaklupa.org/nama.txt", function(text) {
      let textArray = text.split(".");
  
      textArray.forEach(function(txtItem, i) {
        if (skel.breakpoint("large").active) {
          textArray[i] = '<b class="name" style="font-size: 50px;">' + txtItem;
        } else {
          textArray[i] = '<b class="name">' + txtItem;
        }
      });
  
      fileDisplayArea.innerHTML = textArray.join(".</b>");
    });
  }
  
  $(document).ready(function() {
    // Load names from txt file to page
    addNames();
  
    // If on desktop, bottom text has large font
    if (skel.breakpoint("large").active) {
      $(".bottom").css({
        "font-size": 50,
        "padding-left": 60,
        "padding-right": 60
      });
    }
  
    // Force names to fade on load
    $("body").scrollTop(1);
  
    // Add fadein scroll features
    $(".name").scrollex({
      scroll: function(progress) {
        // Progressively increase a name's opacity as we scroll through it.
        $(this).css("opacity", Math.max(0, Math.min(1, progress + 1)));
      }
    });
    $(".bottom").scrollex({
      top: "-20%",
      scroll: function(progress) {
        // Progressively increase a name's opacity as we scroll through it.
        $(this).css("opacity", Math.max(0, Math.min(1, progress + 1)));
      }
    });
  });