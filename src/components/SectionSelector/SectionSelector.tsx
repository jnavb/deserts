import { FC } from 'react';

export interface SectionSelectorProps {}

const SectionSelector: FC<SectionSelectorProps> = () => {
  return (
    <div>
      <button>Shop</button>;<button>Favorites</button>;
    </div>
  );
};

export default SectionSelector;
