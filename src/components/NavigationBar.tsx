import { HiChevronLeft } from 'react-icons/hi';
import { NavigationBarContainer as Container } from '../styles/components/navigation-bar';
import { motion } from 'framer-motion';

interface Props {
  icon: JSX.Element;
  locationName: string;
}

export default function NavigationBar(props: Props): JSX.Element {
  return (
    <Container>
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
        title='Go to previous page'
        onClick={() => {
          history.back();
        }}
      >
        <HiChevronLeft />
      </motion.button>
      <h3>
        {props.icon}
        <span>{props.locationName}</span>
      </h3>
    </Container>
  );
}
