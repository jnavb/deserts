import { FC, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import IconButton from '../IconButton/IconButton';
import './Header.scss';

export interface HeaderProps {
  title: string;
  disableBack?: boolean;
  secondaryButtons?: { render: ReactNode; handleOnClick: () => void }[];
}

const Header: FC<RouteComponentProps<any> & HeaderProps> = ({
  title,
  history,
  disableBack,
  secondaryButtons,
}) => {
  return (
    <div className="header">
      {!disableBack && (
        <IconButton
          className="header__btn"
          src={process.env.PUBLIC_URL + '/back.svg'}
          onClick={() => history.goBack()}
        ></IconButton>
      )}
      <div className="header__title">{title}</div>
      <div className="header__secondary-buttons">
        {secondaryButtons?.map(
          ({ render: SecondaryButton, handleOnClick }, index) => (
            <div key={index}>{SecondaryButton}</div>
          ),
        )}
      </div>
    </div>
  );
};

export default withRouter(Header);
