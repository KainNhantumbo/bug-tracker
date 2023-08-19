import type { FC } from 'react';
import { IconType } from 'react-icons';
import { motion } from 'framer-motion';
import { HiChevronLeft } from 'react-icons/hi';
import { _navigation as Container } from '../styles/components/navigation-bar';

interface Props {
  icon: IconType;
  locationName: string;
}

const NavigationBar: FC<Props> = (props): JSX.Element => (
  <Container>
    <motion.button
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.95 }}
      title='Go to previous page'
      onClick={() => {
        history.back();
      }}>
      <HiChevronLeft />
    </motion.button>
    <h3>
      <props.icon />
      <span>{props.locationName}</span>
    </h3>
  </Container>
);

export default NavigationBar;
