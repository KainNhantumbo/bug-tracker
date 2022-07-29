import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { BiSearch, FiX } from 'react-icons/all';

interface Props {
	active: boolean;
	quit: () => void;
	actionFn: (e: SubmitEvent) => Promise<void>;
	stateFn: React.Dispatch<React.SetStateAction<string>>;
}

export default function SortBox(): JSX.Element {
  return (
    <AnimatePresence>
      
    </AnimatePresence>
  )
}
