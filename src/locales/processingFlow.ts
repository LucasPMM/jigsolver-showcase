type Stage = { title: string; detail: string }
type ProcessingFlow = {
  title: string
  intro: string
  assignmentExample: string
  stages: readonly [Stage, Stage, Stage, Stage, Stage, Stage, Stage]
  refinement: Stage & {
    steps: readonly [string, string, string]
    labels: readonly [string, string]
  }
}

export const processingFlowPt: ProcessingFlow = {
  title: 'Da fotografia à montagem',
  assignmentExample: 'Ver exemplo com a matriz',
  intro:
    'O fluxo guiado combina o recorte das peças, a imagem de referência e os encaixes entre vizinhos.',
  stages: [
    {
      title: 'Fotografar',
      detail:
        'Capturar as peças e fornecer a imagem do quebra-cabeça pronto como referência.'
    },
    {
      title: 'Separar a peça do fundo',
      detail:
        'Duas abordagens de recorte: limiarização clássica com Otsu ou MobileSAM guiado por uma caixa.'
    },
    {
      title: 'Descrever a peça',
      detail:
        'A máscara isola a peça. O JigSolver normaliza a orientação, caracteriza os lados e extrai medidas de aparência.'
    },
    {
      title: 'Propor poses na referência',
      detail:
        'Três variantes geram hipóteses de célula e rotação. Na última, o contraste local é uma nova tentativa se o registro inicial falhar.'
    },
    {
      title: 'Atribuir com o algoritmo húngaro',
      detail:
        'A matriz tem uma linha por peça restante e uma coluna por célula disponível. O algoritmo escolhe a combinação de menor custo total, sem repetir células.'
    },
    {
      title: 'Avaliar os vizinhos',
      detail:
        'Testar mudanças locais e manter as que melhoram a avaliação conjunta das poses e dos contatos.'
    },
    {
      title: 'Explorar no tabuleiro',
      detail: 'Mostrar a proposta de montagem na interface web para inspeção.'
    }
  ],
  refinement: {
    title: 'Refinamento pelos vizinhos',
    detail:
      'A atribuição inicial pontua peças em células. Depois, o JigSolver também considera os encaixes e a continuidade do desenho entre vizinhos.',
    steps: [
      'Partir da montagem inicialmente proposta.',
      'Testar uma rotação ou troca admissível. No exemplo, a peça direita gira para alinhar a saliência, a reentrância e o traço azul.',
      'Manter a mudança se ela melhorar a nota conjunta das poses e dos contatos.'
    ],
    labels: ['Atribuição inicial', 'Após testar uma rotação']
  }
}

export const processingFlowEn: ProcessingFlow = {
  title: 'From photo to assembly',
  assignmentExample: 'See the example matrix',
  intro:
    'The guided flow combines piece cutouts, the reference image and contacts between neighboring pieces.',
  stages: [
    {
      title: 'Take photos',
      detail:
        'Capture the pieces and supply an image of the completed puzzle as a reference.'
    },
    {
      title: 'Separate piece from background',
      detail:
        'Two cutout approaches: classic Otsu thresholding or box-guided MobileSAM.'
    },
    {
      title: 'Describe the piece',
      detail:
        'The mask isolates the piece. JigSolver normalizes its orientation, classifies the sides and extracts appearance measurements.'
    },
    {
      title: 'Propose poses in the reference',
      detail:
        'Three variants propose cells and rotations. In the last one, local contrast gives rejected registrations a second try.'
    },
    {
      title: 'Assign with the Hungarian algorithm',
      detail:
        'The matrix has one row per remaining piece and one column per available cell. The algorithm finds the lowest-cost combination without reusing cells.'
    },
    {
      title: 'Check neighboring pieces',
      detail:
        'Try local moves and keep those that improve the combined score for poses and contacts.'
    },
    {
      title: 'Explore the board',
      detail: 'Show the proposed assembly in the web interface for inspection.'
    }
  ],
  refinement: {
    title: 'Refinement using neighboring pieces',
    detail:
      'The initial assignment scores pieces in cells. JigSolver then considers how adjacent pieces fit and how their artwork lines up.',
    steps: [
      'Start with the initial proposed assembly.',
      'Try a valid rotation or swap. Here the right piece turns to align the tab, recess and blue line.',
      'Keep the move if it improves the combined score for poses and contacts.'
    ],
    labels: ['Initial assignment', 'After trying a rotation']
  }
}

export const processingFlowFr: ProcessingFlow = {
  title: 'De la photo à l’assemblage',
  assignmentExample: 'Voir l’exemple de matrice',
  intro:
    'Le flux guidé combine les pièces détourées, l’image de référence et les contacts entre pièces voisines.',
  stages: [
    {
      title: 'Photographier',
      detail:
        'Photographier les pièces et fournir une image du puzzle terminé comme référence.'
    },
    {
      title: 'Détourer la pièce',
      detail:
        'Deux approches de segmentation : le seuillage classique d’Otsu ou MobileSAM guidé par un rectangle.'
    },
    {
      title: 'Décrire la pièce',
      detail:
        'Le masque isole la pièce. JigSolver normalise son orientation, classe ses côtés et extrait des mesures d’apparence.'
    },
    {
      title: 'Proposer des poses dans la référence',
      detail:
        'Trois variantes proposent des cases et des rotations. La dernière réessaie les recalages rejetés après un rehaussement local du contraste.'
    },
    {
      title: 'Attribuer avec l’algorithme hongrois',
      detail:
        'La matrice contient une ligne par pièce restante et une colonne par case disponible. L’algorithme minimise le coût total sans réutiliser de case.'
    },
    {
      title: 'Évaluer les pièces voisines',
      detail:
        'Tester des changements locaux et garder ceux qui améliorent le score combiné des poses et des contacts.'
    },
    {
      title: 'Explorer le plateau',
      detail:
        'Afficher la proposition d’assemblage dans l’interface web pour l’examiner.'
    }
  ],
  refinement: {
    title: 'Affinement par les pièces voisines',
    detail:
      'L’attribution initiale note les pièces dans les cases. JigSolver examine ensuite l’emboîtement des pièces voisines et la continuité du dessin.',
    steps: [
      'Partir de la proposition initiale.',
      'Tester une rotation ou un échange admissible. Ici, la pièce de droite pivote pour aligner le tenon, le creux et le trait bleu.',
      'Conserver le changement s’il améliore le score combiné des poses et des contacts.'
    ],
    labels: ['Attribution initiale', 'Après un essai de rotation']
  }
}
