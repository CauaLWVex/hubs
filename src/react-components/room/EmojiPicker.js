import React from "react";
import { Picker } from "emoji-mart";
// Twitter emoji sheets downloaded from unpkg.com provided by https://github.com/missive/emoji-mart
import emojiIcons16 from "../../assets/images/emoji-picker-16.png";
import emojiIcons20 from "../../assets/images/emoji-picker-20.png";
import emojiIcons32 from "../../assets/images/emoji-picker-32.png";
import emojiIcons64 from "../../assets/images/emoji-picker-64.png";

import "./EmojiPicker.scss";

const iconSheet = {
  16: emojiIcons16,
  20: emojiIcons20,
  32: emojiIcons32,
  64: emojiIcons64
};

export function EmojiPicker(props) {
  return (
    <Picker
      title="Escolha um emoji!"
      i18n={
        {
          search: 'Pesquisar',
          clear: 'Limpar', // Accessible label on "clear" button
          notfound: 'Nenhum Emoji Encontrado',
          skintext: 'Escolha o tom de pele padrão',
          categories: {
            search: 'Resultados da Busca',
            recent: 'Frequentes',
            smileys: 'Sorrisos e Emoções',
            people: 'Pessoas & Corpo',
            nature: 'Animais & Natureza',
            foods: 'Comidas & Bebidas',
            activity: 'Atividades',
            places: 'Viagem & Lugares',
            objects: 'Objetos',
            symbols: 'Símbolos',
            flags: 'Bandeiras',
            custom: 'Personalizados',
          },
          categorieslabel: 'Categorias', // Accessible title for the list of categories
          skintones: {
            1: 'Tom de Pele Padrão',
            2: 'Tom Claro',
            3: 'Tom Médio-Claro',
            4: 'Tom Médio',
            5: 'Tom Médio-Escuro',
            6: 'Tom Escuro',
          }
        }
      }
      color="var(--tab-highlight-color)"
      // eslint-disable-next-line no-unused-vars
      backgroundImageFn={(set, sheetSize) => iconSheet[sheetSize]}
      {...props}
    />
  );
}
