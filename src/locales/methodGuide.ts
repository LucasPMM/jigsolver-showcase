type Topic = {
  title: string
  summary: string
  steps: readonly [string, string, string]
}

type Guide = {
  eyebrow: string
  title: string
  intro: string
  illustrationNote: string
  groupNames: readonly [string, string, string]
  topics: Record<
    | 'otsu'
    | 'mobileSam'
    | 'sideProfile'
    | 'rgba'
    | 'registration'
    | 'contrast'
    | 'hungarian'
    | 'edges'
    | 'packing',
    Topic
  >
  sideLabels: readonly [string, string, string]
  left: string
  right: string
  piece: string
  local: string
  global: string
}

export const methodGuidePt: Guide = {
  eyebrow: 'GUIA VISUAL',
  title: 'Por dentro do JigSolver',
  illustrationNote: 'Ilustrações esquemáticas para explicar os métodos.',
  intro:
    'Da foto ao tabuleiro: veja como as peças são recortadas, comparadas e posicionadas.',
  groupNames: [
    'Recortar as peças',
    'Reconstruir o tabuleiro',
    'Problemas relacionados'
  ],
  topics: {
    otsu: {
      title: 'Limiarização de Otsu',
      summary:
        'Otsu escolhe um limiar automaticamente a partir do histograma de tons de cinza.',
      steps: [
        'Converter a foto para cinza.',
        'Separar os pixels em claros e escuros.',
        'Selecionar a região da peça e extrair seu contorno.'
      ]
    },
    mobileSam: {
      title: 'MobileSAM',
      summary:
        'O JigSolver indica a região da peça com uma caixa. O modelo prevê quais pixels pertencem a ela.',
      steps: [
        'Estimar uma caixa em volta da peça.',
        'Combinar a caixa com as características extraídas pelo TinyViT.',
        'Usar a máscara prevista para remover o fundo.'
      ]
    },
    sideProfile: {
      title: 'Caracterização das laterais',
      summary:
        'No lado de cima, o primeiro pixel da máscara em cada coluna forma o perfil. As partes retas junto aos cantos ajudam a estimar a linha de base.',
      steps: [
        'Comparar o perfil com a linha tracejada na faixa central (35% a 65%).',
        'Se o desvio máximo for menor que 3,2% da maior dimensão do corpo da peça, o lado é reto.',
        'Nos demais casos, predomínio para fora indica saliência. Predomínio para dentro indica reentrância.'
      ]
    },
    rgba: {
      title: 'Espacial RGBA',
      summary:
        'O método compara a peça com células e rotações admissíveis na imagem de referência. A máscara alfa exclui o fundo.',
      steps: [
        'Alinhar a peça a uma pose candidata.',
        'Comparar os pixels correspondentes, inclusive nas abas quando há suporte.',
        'Pontuar a aparência: 70% de similaridade espacial e 30% de estatísticas de cor.'
      ]
    },
    registration: {
      title: 'Registro Espacial',
      summary:
        'Detalhes visuais em comum ajudam a propor a célula e a rotação da peça.',
      steps: [
        'Detectar pontos com SIFT e normalizar os descritores com RootSIFT.',
        'Parear descritores e estimar o alinhamento com RANSAC.',
        'Validar a pose. Se não puder fixá-la, recorrer à comparação espacial.'
      ]
    },
    contrast: {
      title: 'Registro + contraste',
      summary:
        'Se o registro inicial for rejeitado, o JigSolver faz uma nova tentativa com contraste local realçado.',
      steps: [
        'Aplicar CLAHE à peça e à referência em tons de cinza.',
        'Extrair e parear os pontos novamente.',
        'Validar com os pixels sem realce. Se a pose não puder ser fixada, voltar à comparação espacial.'
      ]
    },
    hungarian: {
      title: 'Algoritmo húngaro',
      summary:
        'As duas peças preferem a esquerda. Considerar as duas juntas dá uma soma melhor do que escolher primeiro a melhor célula para A.',
      steps: [
        'Uma linha por peça e uma coluna por célula.',
        'Para cada par, usar a melhor rotação admissível e calcular o custo: 1 − nota.',
        'Minimizar o custo total, sem repetir células.'
      ]
    },
    edges: {
      title: 'Correspondência de bordas',
      summary:
        'Neste problema relacionado, peças quadradas são organizadas de modo que as bordas em contato combinem.',
      steps: [
        'Quadrado com quadrado: contato válido.',
        'Quadrado com losango: contato inválido.',
        'Na grade resolvida, os quatro contatos internos combinam.'
      ]
    },
    packing: {
      title: 'Empacotamento de poliominós',
      summary:
        'Neste problema relacionado, as formas são feitas de quadrados unidos por lados.',
      steps: [
        'Escolher posições e rotações para as formas.',
        'Acomodá-las dentro da grade, sem sobreposição.',
        'Preencher toda a grade é um requisito adicional do ladrilhamento.'
      ]
    }
  },
  sideLabels: ['Reto', 'Saliência', 'Reentrância'],
  left: 'Esquerda',
  right: 'Direita',
  piece: 'Peça',
  local: 'Escolha local',
  global: 'Escolha global'
}

export const methodGuideEn: Guide = {
  eyebrow: 'VISUAL GUIDE',
  title: 'Inside JigSolver',
  illustrationNote: 'Schematic illustrations of how the methods work.',
  intro:
    'From photo to board: see how pieces are isolated, compared and placed.',
  groupNames: [
    'Isolating pieces',
    'Reconstructing the board',
    'Related problems'
  ],
  topics: {
    otsu: {
      title: 'Otsu thresholding',
      summary:
        'Otsu selects a threshold automatically from the grayscale histogram.',
      steps: [
        'Convert the photo to grayscale.',
        'Split pixels into dark and light groups.',
        'Select the piece region and extract its outline.'
      ]
    },
    mobileSam: {
      title: 'MobileSAM',
      summary:
        'JigSolver indicates the piece region with a box. The model predicts which pixels belong to it.',
      steps: [
        'Estimate a bounding box around the piece.',
        'Combine the box with features from TinyViT.',
        'Use the predicted mask to remove the background.'
      ]
    },
    sideProfile: {
      title: 'Classifying piece sides',
      summary:
        'For the top side, the first mask pixel in each column forms the profile. The straight shoulders near the corners help estimate its baseline.',
      steps: [
        'Compare the profile to the dashed line across the central band (35% to 65%).',
        'If the maximum deviation is under 3.2% of the piece body’s largest dimension, the side is flat.',
        'Otherwise, a dominant outward deviation indicates a tab. A dominant inward deviation indicates a recess.'
      ]
    },
    rgba: {
      title: 'Spatial RGBA',
      summary:
        'The method compares the piece at valid cells and rotations in the reference image. The alpha mask excludes the background.',
      steps: [
        'Align the piece at a candidate pose.',
        'Compare corresponding pixels, including tabs when supported.',
        'Score appearance: 70% spatial similarity and 30% color statistics.'
      ]
    },
    registration: {
      title: 'Spatial registration',
      summary:
        'Shared visual details help propose a cell and rotation for the piece.',
      steps: [
        'Detect points with SIFT and normalize descriptors with RootSIFT.',
        'Match descriptors and estimate the alignment with RANSAC.',
        'Validate the pose. If it cannot be fixed, fall back to spatial comparison.'
      ]
    },
    contrast: {
      title: 'Registration + contrast',
      summary:
        'If the initial registration is rejected, JigSolver tries again with enhanced local contrast.',
      steps: [
        'Apply CLAHE to the grayscale piece and reference.',
        'Extract and match points again.',
        'Validate against unenhanced pixels. If the pose cannot be fixed, fall back to spatial comparison.'
      ]
    },
    hungarian: {
      title: 'Hungarian algorithm',
      summary:
        'Both pieces prefer the left slot. Considering them together gives a better total than finding the best slot for A first.',
      steps: [
        'One row per piece and one column per cell.',
        'For each pair, take the best valid rotation and compute cost: 1 − score.',
        'Minimize total cost without reusing cells.'
      ]
    },
    edges: {
      title: 'Edge matching',
      summary:
        'In this related problem, square pieces are arranged so their touching edges match.',
      steps: [
        'Square against square: valid contact.',
        'Square against diamond: invalid contact.',
        'All four internal contacts match in the solved grid.'
      ]
    },
    packing: {
      title: 'Polyomino packing',
      summary:
        'In this related problem, the shapes are made of unit squares connected edge to edge.',
      steps: [
        'Choose positions and rotations for the shapes.',
        'Place them inside the grid without overlaps.',
        'Filling the entire grid is an additional requirement of tiling.'
      ]
    }
  },
  sideLabels: ['Flat', 'Tab', 'Recess'],
  left: 'Left',
  right: 'Right',
  piece: 'Piece',
  local: 'Local choice',
  global: 'Global choice'
}

export const methodGuideFr: Guide = {
  eyebrow: 'GUIDE VISUEL',
  title: 'Les coulisses de JigSolver',
  illustrationNote:
    'Illustrations schématiques du fonctionnement des méthodes.',
  intro:
    'De la photo au plateau : découvrez comment les pièces sont isolées, comparées et placées.',
  groupNames: [
    'Isoler les pièces',
    'Reconstituer le plateau',
    'Problèmes connexes'
  ],
  topics: {
    otsu: {
      title: 'Seuillage d’Otsu',
      summary:
        'Otsu choisit automatiquement un seuil à partir de l’histogramme des niveaux de gris.',
      steps: [
        'Convertir la photo en niveaux de gris.',
        'Séparer les pixels sombres et clairs.',
        'Sélectionner la région de la pièce et extraire son contour.'
      ]
    },
    mobileSam: {
      title: 'MobileSAM',
      summary:
        'JigSolver indique la région de la pièce par un rectangle. Le modèle prédit quels pixels lui appartiennent.',
      steps: [
        'Estimer un rectangle autour de la pièce.',
        'Combiner le rectangle avec les caractéristiques extraites par TinyViT.',
        'Utiliser le masque prédit pour supprimer le fond.'
      ]
    },
    sideProfile: {
      title: 'Classification des côtés',
      summary:
        'Pour le côté supérieur, le premier pixel du masque dans chaque colonne forme le profil. Les segments droits proches des coins aident à estimer la ligne de base.',
      steps: [
        'Comparer le profil à la ligne en pointillés dans la bande centrale (de 35 % à 65 %).',
        'Si l’écart maximal est inférieur à 3,2 % de la plus grande dimension du corps de la pièce, le côté est plat.',
        'Sinon, un écart dominant vers l’extérieur indique un tenon. Vers l’intérieur, il indique un creux.'
      ]
    },
    rgba: {
      title: 'RGBA spatial',
      summary:
        'La méthode compare la pièce aux cases et rotations admissibles de l’image de référence. Le masque alpha exclut le fond.',
      steps: [
        'Aligner la pièce sur une pose candidate.',
        'Comparer les pixels correspondants, y compris ceux des tenons lorsque cela est possible.',
        'Noter l’apparence : 70 % de similarité spatiale et 30 % de statistiques de couleur.'
      ]
    },
    registration: {
      title: 'Recalage spatial',
      summary:
        'Des détails visuels communs aident à proposer une case et une rotation pour la pièce.',
      steps: [
        'Détecter les points avec SIFT et normaliser les descripteurs avec RootSIFT.',
        'Apparier les descripteurs et estimer l’alignement avec RANSAC.',
        'Valider la pose. Si elle ne peut pas être fixée, revenir à la comparaison spatiale.'
      ]
    },
    contrast: {
      title: 'Recalage + contraste',
      summary:
        'Si le recalage initial est rejeté, JigSolver réessaie après avoir renforcé le contraste local.',
      steps: [
        'Appliquer CLAHE à la pièce et à la référence en niveaux de gris.',
        'Extraire et apparier à nouveau les points.',
        'Valider sur les pixels sans rehaussement. Si la pose ne peut pas être fixée, revenir à la comparaison spatiale.'
      ]
    },
    hungarian: {
      title: 'Algorithme hongrois',
      summary:
        'Les deux pièces préfèrent la case de gauche. Les considérer ensemble donne un meilleur total que de choisir d’abord la meilleure case pour A.',
      steps: [
        'Une ligne par pièce et une colonne par case.',
        'Pour chaque paire, retenir la meilleure rotation admissible et calculer le coût : 1 − score.',
        'Minimiser le coût total sans réutiliser de case.'
      ]
    },
    edges: {
      title: 'Correspondance des bords',
      summary:
        'Dans ce problème connexe, on dispose des pièces carrées pour que les bords qui se touchent correspondent.',
      steps: [
        'Carré contre carré : contact valide.',
        'Carré contre losange : contact invalide.',
        'Les quatre contacts internes concordent dans la grille résolue.'
      ]
    },
    packing: {
      title: 'Empaquetage de polyominos',
      summary:
        'Dans ce problème connexe, les formes sont composées de carrés unitaires reliés par leurs côtés.',
      steps: [
        'Choisir les positions et rotations des formes.',
        'Les placer dans la grille sans chevauchement.',
        'Le pavage exige en plus de remplir toute la grille.'
      ]
    }
  },
  sideLabels: ['Plat', 'Tenon', 'Creux'],
  left: 'Gauche',
  right: 'Droite',
  piece: 'Pièce',
  local: 'Choix local',
  global: 'Choix global'
}
