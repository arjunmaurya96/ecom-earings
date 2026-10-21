import { motion } from 'framer-motion';

/** Scroll karne pe halka fade-up animation. delay seconds mein. */
export default function Reveal({ as = 'div', delay = 0, y = 24, className = '', children, ...rest }) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
}
