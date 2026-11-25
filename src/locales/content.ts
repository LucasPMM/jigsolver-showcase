import { methodGuideEn, methodGuideFr, methodGuidePt } from './methodGuide'
import {
  processingFlowEn,
  processingFlowFr,
  processingFlowPt
} from './processingFlow'

export const pt = {
  nav: [
    'Como funciona',
    'Experiências',
    'Demonstrações',
    'Fotografias',
    'Métodos'
  ],
  methodGuide: methodGuidePt,
  processingFlow: processingFlowPt,
  skip: 'Pular para o conteúdo',
  menu: 'Abrir navegação',
  closeMenu: 'Fechar navegação',
  eyebrow: 'VISÃO COMPUTACIONAL, PEÇA POR PEÇA',
  hero: 'Uma nova perspectiva',
  heroEm: 'para cada peça.',
  intro:
    'Da fotografia à reconstrução digital. Explore como o JigSolver combina visão computacional e inteligência artificial para apoiar a montagem de quebra-cabeças físicos.',
  watch: 'Ver em ação',
  posterLink: 'Ler o banner acadêmico (PDF · português)',
  fullscreen: 'Abrir vídeo em tela cheia',
  tapToPlay: 'Toque para assistir',
  loadingVideo:
    'Carregando vídeo… Se não iniciar, toque em Reproduzir demonstração.',
  playbackBlocked:
    'A reprodução automática foi bloqueada pelo navegador. Toque em Reproduzir demonstração.',
  openVideoFile: 'Abrir vídeo diretamente',
  viewImage: 'Ver imagem em tela cheia',
  closeImage: 'Fechar imagem',
  imageUnavailable: 'Não foi possível carregar esta imagem.',
  explore: 'Conhecer o projeto',
  researchBadge: 'Protótipo de pesquisa',
  heroCaption: 'The Bedroom: uma montagem digital a partir de posições salvas.',
  scroll: 'Continue explorando',
  journeyEyebrow: 'DA MESA PARA A TELA',
  journeyTitle: 'Peças soltas. Novas possibilidades.',
  journeyIntro:
    'Uma jornada que conecta o que você vê ao que o computador consegue analisar.',
  steps: [
    {
      title: 'Capture as peças',
      text: 'Fotografe ou envie imagens das peças para iniciar a análise.',
      tag: '01 / CAPTURAR'
    },
    {
      title: 'Encontre os detalhes',
      text: 'Separe peça e fundo, observe contornos e compare características visuais.',
      tag: '02 / ANALISAR'
    },
    {
      title: 'Explore a montagem',
      text: 'Visualize uma reconstrução digital e acompanhe as relações entre as peças.',
      tag: '03 / VISUALIZAR'
    }
  ],
  experienceEyebrow: 'UMA EXPERIÊNCIA, DIFERENTES TELAS',
  experienceTitle: 'Na mesa. No computador. Na sua mão.',
  experienceIntro:
    'Cada tela tem seu papel. Mais espaço para explorar a reconstrução; mais proximidade para acompanhar as peças físicas.',
  desktop: 'No computador',
  mobile: 'No celular',
  desktopTitle: 'Veja a montagem de outro ângulo.',
  desktopText:
    'Um espaço amplo para explorar o quebra-cabeça, comparar peças e observar os detalhes que ajudam a decidir o próximo encaixe.',
  desktopFeatures: [
    'Visão geral do tabuleiro',
    'Peças e recortes em detalhe',
    'Navegação com precisão'
  ],
  mobileTitle: 'Explore o JigSolver no celular.',
  mobileText:
    'Leve o projeto para perto das peças. Consulte a imagem de referência e explore o quebra-cabeça em uma interface adaptada ao toque.',
  mobileFeatures: [
    'Projetos sempre à mão',
    'Referência visual durante a montagem',
    'Exploração por toque'
  ],
  demoEyebrow: 'MENOS EXPLICAÇÃO. MAIS DESCOBERTA.',
  demoTitle: 'Um olhar por dentro do JigSolver.',
  demoIntro:
    'Explore as peças, interaja com o tabuleiro e acompanhe o assistente em ação.',
  featuredVideos: [
    {
      title: 'The Bedroom, peça por peça',
      desc: 'The Bedroom ganha forma em uma animação das posições calculadas para suas peças.',
      category: 'VISÃO GERAL'
    },
    {
      title: 'Explore o JigSolver no computador',
      desc: 'Explore o tabuleiro e veja os detalhes de cada peça em uma área de trabalho ampla.',
      category: 'DESKTOP'
    },
    {
      title: 'Explore o JigSolver no celular',
      desc: 'Consulte seus projetos, a imagem de referência e os recortes das peças pelo celular.',
      category: 'MOBILE'
    }
  ],
  demos: [
    {
      title: 'Das peças à proposta de montagem',
      desc: 'Da fotografia ao recorte, acompanhe as peças de Animais Terra até uma proposta de montagem.',
      category: 'PEÇAS E MONTAGEM'
    },
    {
      title: 'Explore a reconstrução',
      desc: 'Mova peças e grupos pelo tabuleiro, explore encaixes e examine cada detalhe da reconstrução.',
      category: 'INTERAÇÃO'
    },
    {
      title: 'Navegue pelo assistente',
      desc: 'Aproxime uma peça da câmera e acompanhe sua análise no assistente, sem sair da mesa de montagem.',
      category: 'MOBILE'
    },
    {
      title: 'Montagem com peças fotografadas',
      desc: 'Das fotografias ao tabuleiro: veja a proposta de montagem do Dinossauro, com 100 peças.',
      category: 'QUEBRA-CABEÇA FOTOGRAFADO'
    }
  ],
  play: 'Reproduzir demonstração',
  replay: 'Reiniciar vídeo',
  expand: 'Ampliar vídeo',
  close: 'Fechar demonstração',
  previous: 'Demonstração anterior',
  next: 'Próxima demonstração',
  pendingMedia: 'Demonstração em preparação',
  mediaUnavailable:
    'Não foi possível carregar este vídeo. Tente novamente ou veja outra demonstração.',
  photosEyebrow: 'PEÇAS REAIS, DESAFIOS REAIS',
  photosTitle: 'Da fotografia ao recorte.',
  photosIntro:
    'Veja como o JigSolver separa as peças do fundo e revela seus contornos, preparando cada imagem para a análise da montagem.',
  photoColumns: ['Fotografia original', 'Método clássico', 'MobileSAM'],
  photoOriginal: 'Ver painel original completo',
  photosNote:
    'A mesma fotografia, processada por dois métodos: segmentação clássica e MobileSAM.',
  photoExamples: [
    {
      title: 'Peça azul sobre granito',
      alts: [
        'Fotografia de peça azul sobre granito.',
        'Segmentação clássica da peça azul, ainda incluindo uma região extensa de granito.',
        'Recorte MobileSAM da peça azul sobre fundo quadriculado.'
      ]
    },
    {
      title: 'Peça de elefante sobre madeira',
      alts: [
        'Fotografia de peça com parte de um elefante sobre mesa de madeira.',
        'Segmentação clássica da peça de elefante, incluindo parte da mesa.',
        'Recorte MobileSAM da peça de elefante sobre fundo quadriculado.'
      ]
    }
  ],
  aboutEyebrow: 'SOBRE O PROJETO',
  aboutTitle: 'Tecnologia para ajudar a enxergar o próximo passo.',
  aboutText:
    'O JigSolver aproxima visão computacional e montagem de quebra-cabeças físicos. Desenvolvido em Ciência da Computação na UFMG, reúne análise de imagens, um tabuleiro interativo e um assistente com câmera em uma experiência visual.',
  author: 'Desenvolvido por Lucas Paulo Martins Mariz',
  university: 'Projeto Orientado em Computação I · UFMG',
  footer: 'Feito de curiosidade. Construído peça por peça.',
  credits: 'Projeto no GitHub',
  light: 'Claro',
  dark: 'Escuro',
  theme: 'Tema',
  language: 'Idioma',
  backTop: 'Voltar ao início',
  mainNavigation: 'Navegação principal',
  changeTheme: 'Alterar tema',
  resumeAnimations: 'Retomar animações',
  pauseAnimations: 'Pausar animações',
  piecePossibility: 'Uma peça. Uma nova possibilidade.',
  workspace: 'Área de trabalho',
  version: 'Versão'
}
export const en = {
  nav: ['How it works', 'Experiences', 'Demos', 'Photographs', 'Methods'],
  methodGuide: methodGuideEn,
  processingFlow: processingFlowEn,
  skip: 'Skip to content',
  menu: 'Open navigation',
  closeMenu: 'Close navigation',
  eyebrow: 'COMPUTER VISION, PIECE BY PIECE',
  hero: 'A new perspective',
  heroEm: 'for every piece.',
  intro:
    'From a photograph to a digital reconstruction. Explore how JigSolver combines computer vision and artificial intelligence to support physical jigsaw puzzle assembly.',
  watch: 'See it in action',
  posterLink: 'Read the academic poster (PDF · Portuguese)',
  fullscreen: 'Open video in fullscreen',
  tapToPlay: 'Tap to watch',
  loadingVideo:
    'Loading video… If playback does not start, tap Play demonstration.',
  playbackBlocked:
    'Your browser blocked automatic playback. Tap Play demonstration.',
  openVideoFile: 'Open video directly',
  viewImage: 'View image fullscreen',
  closeImage: 'Close image',
  imageUnavailable: 'The image could not be loaded.',
  explore: 'Explore the project',
  researchBadge: 'Research prototype',
  heroCaption: 'The Bedroom: a digital assembly replay from saved positions.',
  scroll: 'Keep exploring',
  journeyEyebrow: 'FROM THE TABLE TO THE SCREEN',
  journeyTitle: 'Scattered pieces. New possibilities.',
  journeyIntro:
    'A journey connecting what you see with what a computer can analyze.',
  steps: [
    {
      title: 'Capture the pieces',
      text: 'Take a photo or upload images of the pieces to begin the analysis.',
      tag: '01 / CAPTURE'
    },
    {
      title: 'Find the details',
      text: 'Separate pieces from the background, inspect contours and compare visual features.',
      tag: '02 / ANALYZE'
    },
    {
      title: 'Explore the assembly',
      text: 'View a digital reconstruction and explore the relationships between pieces.',
      tag: '03 / VISUALIZE'
    }
  ],
  experienceEyebrow: 'ONE EXPERIENCE, DIFFERENT SCREENS',
  experienceTitle: 'On the table. On your desktop. In your hand.',
  experienceIntro:
    'Every screen has a role. More space to explore a reconstruction; a closer view of the physical pieces.',
  desktop: 'On desktop',
  mobile: 'On mobile',
  desktopTitle: 'See the assembly from another angle.',
  desktopText:
    'Room to explore the puzzle, compare pieces and inspect the details that help you choose the next fit.',
  desktopFeatures: [
    'A clear view of the board',
    'Detailed pieces and cutouts',
    'Precise navigation'
  ],
  mobileTitle: 'Explore JigSolver on mobile.',
  mobileText:
    'Bring your project closer to the pieces. Keep the reference image at hand and explore the puzzle through a touch-friendly interface.',
  mobileFeatures: [
    'Projects at your fingertips',
    'A visual reference while assembling',
    'Touch-friendly exploration'
  ],
  demoEyebrow: 'LESS EXPLAINING. MORE EXPLORING.',
  demoTitle: 'A closer look at JigSolver.',
  demoIntro:
    'Explore the pieces, interact with the board and see the camera assistant in action.',
  featuredVideos: [
    {
      title: 'The Bedroom, piece by piece',
      desc: 'Watch The Bedroom take shape in an animation of the computed piece positions.',
      category: 'OVERVIEW'
    },
    {
      title: 'Explore JigSolver on desktop',
      desc: 'Explore the board and inspect each piece in a spacious workspace.',
      category: 'DESKTOP'
    },
    {
      title: 'Explore JigSolver on mobile',
      desc: 'Browse your projects, reference image and piece cutouts on your phone.',
      category: 'MOBILE'
    }
  ],
  demos: [
    {
      title: 'From pieces to a proposed assembly',
      desc: 'From photograph to cutout, follow the Land Animals pieces through to a proposed assembly.',
      category: 'PIECES AND ASSEMBLY'
    },
    {
      title: 'Explore the reconstruction',
      desc: 'Move pieces and groups around the board, explore connections and inspect the reconstruction in detail.',
      category: 'INTERACTION'
    },
    {
      title: 'Navigate the assistant',
      desc: 'Bring a piece to the camera and follow its analysis in the assistant, right beside your puzzle.',
      category: 'MOBILE'
    },
    {
      title: 'Assembly from photographed pieces',
      desc: 'From photographs to the board: explore the proposed assembly of the 100-piece Dinosaur puzzle.',
      category: 'PHOTOGRAPHED PUZZLE'
    }
  ],
  play: 'Play demonstration',
  replay: 'Restart video',
  expand: 'Expand video',
  close: 'Close demonstration',
  previous: 'Previous demonstration',
  next: 'Next demonstration',
  pendingMedia: 'Demonstration in preparation',
  mediaUnavailable:
    'This video could not be loaded. Try again or explore another demonstration.',
  photosEyebrow: 'REAL PIECES, REAL CHALLENGES',
  photosTitle: 'From photograph to cutout.',
  photosIntro:
    'See how JigSolver separates pieces from their backgrounds and reveals their contours, preparing each image for assembly analysis.',
  photoColumns: ['Original photograph', 'Classical method', 'MobileSAM'],
  photoOriginal: 'View the complete original panel',
  photosNote:
    'The same photograph, processed with two approaches: classical segmentation and MobileSAM.',
  photoExamples: [
    {
      title: 'Blue piece on granite',
      alts: [
        'Photograph of a blue piece on granite.',
        'Classical segmentation of the blue piece, retaining a large region of granite.',
        'MobileSAM cutout of the blue piece on a checkerboard background.'
      ]
    },
    {
      title: 'Elephant piece on wood',
      alts: [
        'Photograph of an elephant piece on a wooden table.',
        'Classical segmentation of the elephant piece, retaining part of the table.',
        'MobileSAM cutout of the elephant piece on a checkerboard background.'
      ]
    }
  ],
  aboutEyebrow: 'ABOUT THE PROJECT',
  aboutTitle: 'Technology to help reveal the next step.',
  aboutText:
    'JigSolver brings computer vision to physical jigsaw puzzles. Developed as a Computer Science project at UFMG, it combines image analysis, an interactive board and a camera assistant in a visual experience.',
  author: 'Developed by Lucas Paulo Martins Mariz',
  university: 'Supervised Computer Science Project I · UFMG',
  footer: 'Made of curiosity. Built piece by piece.',
  credits: 'Project on GitHub',
  light: 'Light',
  dark: 'Dark',
  theme: 'Theme',
  language: 'Language',
  backTop: 'Back to top',
  mainNavigation: 'Main navigation',
  changeTheme: 'Change theme',
  resumeAnimations: 'Resume animations',
  pauseAnimations: 'Pause animations',
  piecePossibility: 'One piece. A new possibility.',
  workspace: 'Workspace',
  version: 'Version'
}

export const fr: typeof en = {
  nav: [
    'Fonctionnement',
    'Expériences',
    'Démonstrations',
    'Photographies',
    'Méthodes'
  ],
  methodGuide: methodGuideFr,
  processingFlow: processingFlowFr,
  skip: 'Aller au contenu',
  menu: 'Ouvrir la navigation',
  closeMenu: 'Fermer la navigation',
  eyebrow: 'VISION PAR ORDINATEUR, PIÈCE PAR PIÈCE',
  hero: 'Un nouveau regard',
  heroEm: 'sur chaque pièce.',
  intro:
    'De la photographie à la reconstruction numérique. Découvrez comment JigSolver associe vision par ordinateur et intelligence artificielle pour accompagner l’assemblage de puzzles physiques.',
  watch: 'Voir en action',
  posterLink: 'Lire le poster scientifique (PDF · portugais)',
  fullscreen: 'Ouvrir la vidéo en plein écran',
  tapToPlay: 'Touchez pour regarder',
  loadingVideo:
    'Chargement de la vidéo… Si la lecture ne démarre pas, touchez Lire la démonstration.',
  playbackBlocked:
    'Votre navigateur a bloqué la lecture automatique. Touchez Lire la démonstration.',
  openVideoFile: 'Ouvrir directement la vidéo',
  viewImage: 'Voir l’image en plein écran',
  closeImage: 'Fermer l’image',
  imageUnavailable: 'Impossible de charger cette image.',
  explore: 'Découvrir le projet',
  researchBadge: 'Prototype de recherche',
  heroCaption:
    'La Chambre : une animation de l’assemblage à partir de positions enregistrées.',
  scroll: 'Poursuivre la découverte',
  journeyEyebrow: 'DE LA TABLE À L’ÉCRAN',
  journeyTitle: 'Des pièces éparses. De nouvelles possibilités.',
  journeyIntro:
    'Un parcours qui relie ce que vous voyez à ce qu’un ordinateur peut analyser.',
  steps: [
    {
      title: 'Capturez les pièces',
      text: 'Photographiez les pièces ou importez leurs images pour commencer l’analyse.',
      tag: '01 / CAPTURER'
    },
    {
      title: 'Repérez les détails',
      text: 'Séparez les pièces de l’arrière-plan, observez leurs contours et comparez leurs caractéristiques visuelles.',
      tag: '02 / ANALYSER'
    },
    {
      title: 'Explorez l’assemblage',
      text: 'Visualisez une reconstruction numérique et explorez les relations entre les pièces.',
      tag: '03 / VISUALISER'
    }
  ],
  experienceEyebrow: 'UNE EXPÉRIENCE, PLUSIEURS ÉCRANS',
  experienceTitle: 'Sur la table. Sur votre ordinateur. Dans votre main.',
  experienceIntro:
    'Chaque écran a son rôle. Plus d’espace pour explorer la reconstruction ; une vue plus proche des pièces physiques.',
  desktop: 'Sur ordinateur',
  mobile: 'Sur mobile',
  desktopTitle: 'Découvrez l’assemblage sous un autre angle.',
  desktopText:
    'Un espace généreux pour explorer le puzzle, comparer les pièces et observer les détails qui aident à choisir le prochain assemblage.',
  desktopFeatures: [
    'Une vue claire du plateau',
    'Pièces et détourages en détail',
    'Une navigation précise'
  ],
  mobileTitle: 'Découvrez JigSolver sur mobile.',
  mobileText:
    'Gardez votre projet près des pièces. Consultez l’image de référence et explorez le puzzle dans une interface adaptée au toucher.',
  mobileFeatures: [
    'Vos projets à portée de main',
    'Un repère visuel pendant l’assemblage',
    'Une exploration tactile'
  ],
  demoEyebrow: 'MOINS D’EXPLICATIONS. PLUS DE DÉCOUVERTES.',
  demoTitle: 'JigSolver de plus près.',
  demoIntro:
    'Explorez les pièces, interagissez avec le plateau et découvrez l’assistant caméra en action.',
  featuredVideos: [
    {
      title: 'La Chambre, pièce par pièce',
      desc: 'Voyez La Chambre prendre forme dans une animation des positions calculées pour ses pièces.',
      category: 'VUE D’ENSEMBLE'
    },
    {
      title: 'Découvrez JigSolver sur ordinateur',
      desc: 'Explorez le plateau et examinez chaque pièce dans un espace de travail généreux.',
      category: 'ORDINATEUR'
    },
    {
      title: 'Découvrez JigSolver sur mobile',
      desc: 'Consultez vos projets, l’image de référence et les détourages des pièces sur votre téléphone.',
      category: 'MOBILE'
    }
  ],
  demos: [
    {
      title: 'Des pièces à une proposition d’assemblage',
      desc: 'De la photographie au détourage, suivez les pièces d’Animaux terrestres jusqu’à une proposition d’assemblage.',
      category: 'PIÈCES ET ASSEMBLAGE'
    },
    {
      title: 'Explorez la reconstruction',
      desc: 'Déplacez les pièces et les groupes sur le plateau, explorez les raccords et examinez la reconstruction en détail.',
      category: 'INTERACTION'
    },
    {
      title: 'Parcourez l’assistant',
      desc: 'Présentez une pièce à la caméra et suivez son analyse dans l’assistant, juste à côté de votre puzzle.',
      category: 'MOBILE'
    },
    {
      title: 'Assemblage à partir de pièces photographiées',
      desc: 'Des photographies au plateau : découvrez la proposition d’assemblage du puzzle Dinosaure de 100 pièces.',
      category: 'PUZZLE PHOTOGRAPHIÉ'
    }
  ],
  play: 'Lire la démonstration',
  replay: 'Recommencer la vidéo',
  expand: 'Agrandir la vidéo',
  close: 'Fermer la démonstration',
  previous: 'Démonstration précédente',
  next: 'Démonstration suivante',
  pendingMedia: 'Démonstration en préparation',
  mediaUnavailable:
    'Impossible de charger cette vidéo. Réessayez ou découvrez une autre démonstration.',
  photosEyebrow: 'DES PIÈCES RÉELLES, DES DÉFIS RÉELS',
  photosTitle: 'De la photographie au détourage.',
  photosIntro:
    'Découvrez comment JigSolver sépare les pièces de leur arrière-plan et révèle leurs contours, préparant chaque image à l’analyse de l’assemblage.',
  photoColumns: ['Photographie originale', 'Méthode classique', 'MobileSAM'],
  photoOriginal: 'Voir le panneau original complet',
  photosNote:
    'La même photographie, traitée selon deux approches : la segmentation classique et MobileSAM.',
  photoExamples: [
    {
      title: 'Pièce bleue sur du granit',
      alts: [
        'Photographie d’une pièce bleue sur du granit.',
        'Segmentation classique de la pièce bleue, conservant une grande zone de granit.',
        'Détourage MobileSAM de la pièce bleue sur fond à damier.'
      ]
    },
    {
      title: 'Pièce d’éléphant sur du bois',
      alts: [
        'Photographie d’une pièce représentant une partie d’un éléphant sur une table en bois.',
        'Segmentation classique de la pièce d’éléphant, conservant une partie de la table.',
        'Détourage MobileSAM de la pièce d’éléphant sur fond à damier.'
      ]
    }
  ],
  aboutEyebrow: 'À PROPOS DU PROJET',
  aboutTitle: 'La technologie pour mieux voir la prochaine étape.',
  aboutText:
    'JigSolver met la vision par ordinateur au service des puzzles physiques. Développé dans le cadre d’un projet d’informatique à l’UFMG, il réunit analyse d’images, plateau interactif et assistant caméra dans une expérience visuelle.',
  author: 'Développé par Lucas Paulo Martins Mariz',
  university: 'Projet encadré en informatique I · UFMG',
  footer: 'Né de la curiosité. Construit pièce par pièce.',
  credits: 'Projet sur GitHub',
  light: 'Clair',
  dark: 'Sombre',
  theme: 'Thème',
  language: 'Langue',
  backTop: 'Retour en haut',
  mainNavigation: 'Navigation principale',
  changeTheme: 'Changer de thème',
  resumeAnimations: 'Reprendre les animations',
  pauseAnimations: 'Mettre les animations en pause',
  piecePossibility: 'Une pièce. Une nouvelle possibilité.',
  workspace: 'Espace de travail',
  version: 'Version'
}
