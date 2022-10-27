const i18next = window.i18next;

// initialize the internationalisation and translate strings

i18next.init({
  lng: "en",
  resources: {
    en: {
      translation: {
        title: "Mad Libs",
        subtitle: "Fill in the blanks to complete the story!",
        preview: "Preview",
        noun: "noun",
        verb: "verb",
        adjective: "adjective",
        language: "Language",
        english: "English",
        arabic: "Arabic",
        kurdish: "Kurdish",
        reset: "Reset inputs",
        edit: "Edit story",
        cancel: "Cancel",
        save: "Save",
      },
    },
    ar: {
      translation: {
        title: "لعبة ملء الفراغات",
        subtitle: "املأ الفراغات لإكمال القصة!",
        preview: "معاينة",
        noun: "اسم",
        verb: "فعل",
        adjective: "صفة",
        language: "اللغة",
        english: "الإنجليزية",
        arabic: "العربية",
        kurdish: "الكردية",
        reset: "إعادة تعيين المدخلات",
        edit: "تعديل القصة",
        cancel: "إلغاء",
        save: "حفظ",
      },
    },
    ckb: {
      translation: {
        title: "یاری پڕکرنەوەی بۆشایی",
        subtitle: "بۆ تەواوکردنی چیرۆکەکە شوێنە بەتاڵەکان پڕبکەرەوە!",
        preview: "بینینی چیرۆکەکە",
        noun: "ناو",
        verb: "کار",
        adjective: "ئاوەڵناو",
        language: "زمان",
        english: "ئینگلیزی",
        arabic: "عەرەبی",
        kurdish: "کوردی",
        reset: "پاک بکەرەوە",
        edit: "دەستکاری چیرۆک",
        cancel: "هەڵوەشاندنەوه",
        save: "پاشەکەوتکردن",
      },
    },
  },
});


const getLanguage = () => {
  const language = document.querySelector("#language").value;
  return language;
};

i18next.on("languageChanged", (e) => {
  document.querySelector(".title").innerHTML = i18next.t("title");
  document.querySelector(".subtitle").innerHTML = i18next.t("subtitle");
  document.querySelector(".preview").innerHTML = i18next.t("preview");
  document.querySelector(".language").innerHTML = i18next.t("language");
  document.querySelector('option[value="en"]').innerHTML = i18next.t("english");
  document.querySelector('option[value="ar"]').innerHTML = i18next.t("arabic");
  document.querySelector('option[value="ckb"]').innerHTML =
    i18next.t("kurdish");
  document.querySelector(".reset").innerHTML = i18next.t("reset");
  document.querySelector(".edit").innerHTML = i18next.t("edit");
  if (document.querySelector(".story-editor")) {
    document.querySelector(".story-editor h2").innerHTML = i18next.t("edit");
    document.querySelector(".story-editor .cancel").innerHTML =
      i18next.t("cancel");
    document.querySelector(".story-editor .save").innerHTML = i18next.t("save");
    fetchStory(getLanguage()).then((story) => {
      document.querySelector(".story-editor textarea").value = story;
    });
  }

  fetchStory(getLanguage())
    .then((rawStory) => {
      const processedStory = parseStory(rawStory);
      renderStory(processedStory);
    })
    .then(() => {
      const previews = document.querySelectorAll("span");
      const inputs = document.querySelectorAll("input");
      previews.forEach(
        (preview) =>
          (preview.innerHTML = `(${i18next.t(preview.innerHTML.slice(1, -1))})`)
      );
      inputs.forEach(
        (input) =>
          (input.placeholder = `(${i18next.t(input.placeholder.slice(1, -1))})`)
      );

      loadInputsFromLocalStorage(inputs, previews);
    });
});

const onChangeLanguage = (event) => {
  i18next.changeLanguage(event.target.value);
  localStorage.setItem("language", event.target.value);
};

const posMap = {
  n: "noun",
  v: "verb",
  a: "adjective",
};

const parseInput = (word) => {
  // example: word = "Louis[n]"
  const pos = word.match(/\[.*\]/g); // get the part of speech [n] [v] [a]
  if (pos) {
    // get the part of speech type (noun, verb, adjective)
    // slice the brackets off the part of speech
    const posType = posMap[pos[0].slice(1, -1)] || "unknown"; // pos[0].slice(1, -1): 'n' posType: 'noun'
    word = word.replace(/\[.*\]/g, ""); // remove the part of speech from the word
    return { word, pos: posType }; //
  } else {
    // if there is no part of speech
    return { word };
  }
};

function parseStory(rawStory) {
  return rawStory.split(" ").map(word => parseInput(word));
}

const createMadLibsEditor = (word) => {
  // example word: { word: "Louis", pos: "noun" }
  if (word.pos) {
    if (word.word.match(/[\w]+[.,:;!?]/)) {
      // if the word has punctuation
      // return the input with the punctuation
      return `<input type="text" class="madLibsEditor__${
        word.pos
      }" placeholder="(${i18next.t(word.pos)})">
          ${word.word.replace(/^\s+|\s+$/g, "").slice(-1)}`;
      // ^ this will remove the whitespace and get the punctuation (last character). To keep it in the editor.
    } // if the word does not have punctuation
    // create an input with the part of speech and assign the part of speech a class for styling
    // class="madLibsEditor__${word.pos}" is used for styling
    return `<input type="text" class="madLibsEditor__${
      word.pos
    }" placeholder="(${i18next.t(word.pos)})">`;
  } else {
    // if the word does not have a part of speech
    return word.word;
  }
};

const createPreview = (word) => {
  // word: { word: "Louis", pos: "noun" }
  if (word.pos) {
    // if the word has a part of speech
    if (word.word.match(/[\w]+[.,:;!?]/)) {
      // if the word has punctuation
      return `<span class="madLibsPreview__${word.pos}">(${i18next.t(
        word.pos
      )})</span>
          ${word.word.replace(/^\s+|\s+$/g, "").slice(-1)} `;
      // ^ this will remove the whitespace and get the punctuation (last character). To keep it in the preview.
      // class="madLibsPreview__${word.pos}" => assign a class to the part of speech for styling
    } // if the word does not have punctuation
    return `<span class="madLibsPreview__${word.pos}">(${i18next.t(
      word.pos
    )})</span>`;
    // create a span with the part of speech
  } else {
    // if the word does not have a part of speech
    return word.word;
  }
};

const parseStory = (rawStory) => {
  const story = rawStory.split(" "); // split the story into an array of words
  // check if the story has at least one part of speech
  if (story.some((word) => word.match(/\[.*\]/g))) {
    // if the story has at least one part of speech
    return rawStory.split(" ").map((word) => parseInput(word));
  } else {
    // if the story does not have any part of speech
    throw new Error(
      "The story has incorrect grammar. Please check the story and try again. No part of speech found"
    );
  }
};

const limitUserInput = (event, limit) => {
  if (event.target.value.length > limit) {
    event.target.value = event.target.value.slice(0, limit);
  }
};

const resizeInputBasedOnContent = (event) => {
  const input = event.target;
  if (input.value.length > 8) {
    // if the input value is longer than 10 characters
    input.style.width = `${input.value.length + 2}ch`; // set the input width to the input value length
  } else {
    // if the input value is less than 10 characters
    input.style.width = "10ch"; // reset the input width to 10 characters
  }
};

const onInputChange = (event, preview, index) => {
  const input = event.target; // get the input that was changed
  if (input.value) {
    // if the input has a value
    preview[index].innerText = input.value; // set the preview text to the input value
  } else {
    // if the input does not have a value
    preview[index].innerText = `${input.placeholder}`; // set the preview text to the placeholder
  }

  limitUserInput(event, 20);
  resizeInputBasedOnContent(event);

  localStorage.setItem(`input-${getLanguage()}-${index}`, input.value); // save the input value to local storage
};

const onFocusOut = (event, preview, index) => {
  const input = event.target; // get the input that was blurred
  input.classList.remove("active"); // remove the active class from the input
  preview[index].classList.remove("active");
};

const onFocusIn = (event, preview, index) => {
  const input = event.target; // get the input that was focused
  input.classList.add("active"); // add the active class to the input
  preview[index].classList.add("active");
};

const onEnter = (event, inputs, index) => {
  if (event.key === "Enter") {
    // if the enter key was pressed
    event.preventDefault(); // prevent the default action
    if (index < inputs.length - 1) {
      // if the index is less than the number of inputs
      inputs[index + 1].focus(); // focus the next input
    } else {
      // if the index is greater than the number of inputs
      inputs[0].focus(); // focus the first input
    }
  }
};

const onReset = (event) => {
  const inputs = document.querySelectorAll(".madLibsEditor input");
  const previews = document.querySelectorAll("span");

  event.preventDefault();
  inputs.forEach((input, index) => {
    // loop through the inputs
    console.log(input.value);
    input.value = ""; // reset the input value
    console.log(input.value);
    previews[index].innerText = `${input.placeholder}`; // reset the preview text
    input.style.width = "10ch"; // reset the input width
    localStorage.removeItem(`input-${getLanguage()}-${index}`); // remove the input value from local storage
  });
  inputs[0].focus(); // focus the first input
};

const onEditStory = (story) => {
  story.then((rawStory) => {
    const storyEditor = `
    <div class="story-editor py-8 flex flex-col justify-center">
      <h2 class="text-2xl font-bold text-center">${i18next.t("edit")}</h2>
      <form class="max-w-3xl w-full mx-auto mt-8 flex flex-col justify-center">
        <textarea class="bg-gray-100 border-2 border-gray-300 p-4 rounded-lg dark:bg-neutral-800 dark:border-neutral-700" name="story" id="story" rows="5">${rawStory.trim()}</textarea>
        <div class="flex justify-end gap-4 mt-4">
          <button class="cancel bg-red-500/25 hover:bg-red-700/50 text-red-800 font-bold py-2 px-4 rounded mt-4 dark:bg-red-600/25 dark:text-red-400 dark:hover:bg-red-700/50">${i18next.t(
            "cancel"
          )}</button>
          <button class="save bg-cyan-500/25 hover:bg-cyan-700/50 text-cyan-800 font-bold py-2 px-4 rounded mt-4 dark:bg-cyan-600/25 dark:text-cyan-400 dark:hover:bg-cyan-700/50">${i18next.t(
            "save"
          )}</button>
        </div>
      </form>
    </div>
  `;
    const controls = document.querySelector(".controls");
    if (!document.querySelector(".story-editor")) {
      controls.insertAdjacentHTML("afterend", storyEditor);
    }

    const storyForm = document.querySelector(".story-editor form");
    storyForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const story = document.querySelector("#story").value.trim();
      const parsedStory = parseStory(story);
      renderStory(parsedStory);
    });

    const cancel = document.querySelector(".cancel");
    cancel.addEventListener("click", (event) => {
      event.preventDefault();
      const storyEditor = document.querySelector(".story-editor");
      storyEditor.remove();
    });
  });
};

const loadInputsFromLocalStorage = async (inputs, previews) => {
  inputs.forEach((input, index) => {
    // loop through the inputs
    const value = localStorage.getItem(`input-${getLanguage()}-${index}`);
    if (value) {
      // if the input value exists in local storage
      input.value = value; // set the input value to the value in local storage
      previews[index].innerText = value; // set the preview text to the value in local storage
    }
  });
};

const renderStory = (processedStory) => {
  const madLibsEditor = document.querySelector(".madLibsEditor");
  madLibsEditor.innerHTML = processedStory
    .map((word) => createMadLibsEditor(word))
    .join(" ");

  // show the story preview on the page
  const storyPreview = document.querySelector(".madLibsPreview");
  storyPreview.innerHTML = processedStory
    .map((word) => createPreview(word))
    .join(" ");

  const storyInputs = document.querySelectorAll(".madLibsEditor input");
  const previewTexts = document.querySelectorAll("span");

  storyInputs.forEach((input, index) => {
    // handle onInputChange to the input.
    input.addEventListener("input", (e) =>
      onInputChange(e, previewTexts, index)
    );

    // handle focus events to select the input.
    input.addEventListener("focus", (e) => onFocusIn(e, previewTexts, index));

    //handle focus-out to deselect the input text.
    input.addEventListener("blur", (e) => onFocusOut(e, previewTexts, index));

    //handle onkeydown on enter key to go to the next input.
    input.addEventListener("keydown", (e) => onEnter(e, storyInputs, index));
  });
};

const fetchStory = async (lang) => {
  const response = await fetch(`./${lang}.txt`);
  const story = await response.text();
  return story;
};

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    renderStory(processedStory);

    const storyInputs = document.querySelectorAll(".madLibsEditor input");
    const previewTexts = document.querySelectorAll("span");

    const controls = `
      <div class="controls flex items-center gap-4 mt-8 justify-center">
        <button class="reset bg-red-700/25 hover:bg-red-700/50 text-red-900 px-4 py-2 dark:hover:bg-red-700/50 rounded dark:text-red-400">Reset inputs</button>
        <button class="edit bg-cyan-700/25 hover:bg-cyan-700/25 text-cyan-900 px-4 py-2 dark:hover:bg-cyan-700/50 rounded dark:text-cyan-400">Edit story</button>
        <label for="language" class="language text-neutral-700 dark:text-neutral-300">Language</label>
        <select id="language" name="language" class="language bg-neutral-200 text-neutral-700 px-8 py-2 rounded dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700/80 hover:cursor-pointer">
          <option value="en">English</option>
          <option value="ar">Arabic</option>
          <option value="ckb">Kurdish</option>
        </select>
      </div>
    `;
    const storyPreview = document.querySelector(".madLibsPreview");
    storyPreview.insertAdjacentHTML("afterend", controls);

    const resetButton = document.querySelector(".reset");
    resetButton.addEventListener("click", (e) => onReset(e));

    const languageSelect = document.querySelector("#language");
    languageSelect.addEventListener("change", (e) => onChangeLanguage(e));
    const language = localStorage.getItem("language") || "en";
    languageSelect.value = language;
    i18next.changeLanguage(language);

    const editButton = document.querySelector(".edit");
    editButton.addEventListener("click", (e) =>
      onEditStory(fetchStory(getLanguage()))
    );

    // load inputs from local storage if there are any.
    loadInputsFromLocalStorage(storyInputs, previewTexts);

    console.log(processedStory);
  });
