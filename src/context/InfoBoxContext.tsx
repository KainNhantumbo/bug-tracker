import { CgDanger } from 'react-icons/cg';
import { useState, createContext, ReactNode, useContext } from 'react';

interface Props {
  children: ReactNode;
}

interface ContextProps {
  info: InfoProps;
  setInfo: React.Dispatch<React.SetStateAction<InfoProps>>;
}

// interface for infoBox component data props
export interface InfoProps {
  active: boolean;
  message: string;
  icon: JSX.Element;
  buttonText?: string;
  err?: string;
  actionFn?: () => void;
}

const context = createContext<ContextProps>({
  info: {
    active: false,
    message: '',
    icon: <CgDanger />,
  },
  setInfo: () => {},
});

export default function InfoBoxContext(props: Props) {
  const [info, setInfo] = useState<InfoProps>({
    active: false,
    message: '',
    icon: <CgDanger />,
  });

  return (
    <context.Provider
      value={{
        info,
        setInfo,
      }}
    >
      {props.children}
    </context.Provider>
  );
}

export const useInfoBoxContext = (): ContextProps => {
  const data = useContext(context);
  return data;
};
