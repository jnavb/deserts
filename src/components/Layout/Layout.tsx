import { Header } from '@components';
import { FC, ReactNode } from 'react';
import FooterButton from '../FooterButton/FooterButton';
import './Layout.scss';

export interface LayoutProps {
  title: string;
  children: ReactNode;
  className?: string;
  disableBack?: boolean;
  footer?: string;
  onFooter?: () => void;
  secondaryButtons?: { render: ReactNode; handleOnClick: () => void }[];
}

const Layout: FC<LayoutProps> = ({
  children,
  title,
  footer,
  disableBack,
  className,
  secondaryButtons,
}) => {
  return (
    <div
      className={`layout ${footer ? 'layout--footer-active' : ''} ${
        className ? className : ''
      } ${!disableBack ? 'layout--full-page' : ''}`}
    >
      <Header
        title={title}
        disableBack={disableBack}
        secondaryButtons={secondaryButtons}
      />
      <main className="layout__main">{children}</main>
      {footer && (
        <footer className="layout__footer">
          <FooterButton title={title} />
        </footer>
      )}
    </div>
  );
};

export default Layout;
