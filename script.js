// Model
const model = {
  tabs: [],
  currentTab: null,
};

// View
const view = {
  renderTabs: function () {
    const tabsContainer = $("#tabs-container");
    tabsContainer.empty();

    model.tabs.forEach((tab) => {
      const tabElement = $("<div>", {
        class: "tab",
        text: tab.title,
        click: function () {
          controller.switchTab(tab);
        },
      });

      if (tab === model.currentTab) {
        tabElement.addClass("active");
      }

      tabsContainer.append(tabElement);
    });
  },

  renderIframe: function () {
    const iframeContainer = $("#iframe-container");
    iframeContainer.empty();

    if (model.currentTab) {
      const iframe = $("<iframe>", {
        src: model.currentTab.url,
      });

      iframeContainer.append(iframe);
    }
  },
};

// Controller
const controller = {
  addTab: async function () {
    const url = prompt("Enter the URL for the new tab:", "https://");

    if (url !== null) {
      const title = await getTitleFromUrl(url);

      const newTab = {
        title: title || "New Tab",
        url: url || "about:blank",
      };

      model.tabs.push(newTab);
      model.currentTab = newTab;

      view.renderTabs();
      view.renderIframe();
    }
  },

  switchTab: function (tab) {
    model.currentTab = tab;
    view.renderTabs();
    view.renderIframe();
  },

  closeTab: function () {
    if (model.currentTab) {
      const tabIndex = model.tabs.indexOf(model.currentTab);
      model.tabs.splice(tabIndex, 1);

      model.currentTab =
        model.tabs.length > 0 ? model.tabs[model.tabs.length - 1] : null;

      view.renderTabs();
      view.renderIframe();
    }
  },
  toggleTheme: function () {
    const body = $("body");

    // Check if the current theme is dark
    const isDarkTheme = body.hasClass("dark-theme");

    // Toggle to the opposite theme
    if (isDarkTheme) {
      // If currently in dark theme, switch to light theme
      body.removeClass("dark-theme");
      body.addClass("light-theme");
    } else {
      // If currently in light theme, switch to dark theme
      body.removeClass("light-theme");
      body.addClass("dark-theme");
    }

    // Save the user's theme preference to localStorage
    localStorage.setItem("darkTheme", !isDarkTheme);
  },
  saveSession: function () {
    // Add logic to save the current session
    console.log("Session saved!");
  },

  loadSession: function () {
    // Add logic to load a saved session
    console.log("Session loaded!");
  },
};

// Check for user's theme preference in localStorage and apply it
const isDarkTheme = localStorage.getItem("darkTheme") === "true";
if (isDarkTheme) {
  $("body").addClass("dark-theme");
}

// function to fetch page title from URL
async function getTitleFromUrl(url) {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const match = text.match(/<title>(.*?)<\/title>/i);
    return match ? match[1] : null;
  } catch (error) {
    console.error("Error fetching page title:", error);
    return null;
  }
}

controller.addTab("Google", "https://www.google.com");
controller.addTab("OpenAI", "https://www.openai.com");
