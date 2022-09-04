![DALL-E POLAROID](/public/preview.png "DALL-E POLAROID")

# DALL-E POLAROID

Make your unique polaroid style photo using DALL-E.

## Install

Execute the following commands to download the source code

```
git clone https://github.com/Kiotlin/dalle-polaroid.git
cd dalle-polaroid
```

Execute the following commands to install dependencies

```
npm install
```

Launch

```
npm start
```

## Before using

1. Make sure you have deployed this version of [dalle-playground](https://github.com/Kiotlin/dalle-playground) **(This repo is a fork which is not the newest version of dalle-playground, the data structure of the outputed images might be changed according to the development of origin repo, which may cause dalle-polaroid into error)** into your own Google Colab [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1VFnRR2SvDMUTNQgcJGlJi0F_Kogtq50m?usp=sharing).
2. Run the notebook until the backend is full loaded.
3. Copy the url from the log output of backend into the input box of dalle-polaroid.
4. Feel free to generate your own style of dalle based polaroids!

## TO DO

- [ ] Implement more layout template and font.
- [ ] Implement a function for putting a filter on a photo.
- [ ] Use GPT-3 to translate long text into shorter text, keep editable.
- [ ] Use GPT-3 to translate `promptText` into other language.
