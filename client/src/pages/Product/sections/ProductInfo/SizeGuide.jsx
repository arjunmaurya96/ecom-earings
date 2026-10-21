import { AnimatePresence, motion } from 'framer-motion';
import { HiXMark } from 'react-icons/hi2';
import Portal from '@/components/ui/Portal';
import useOverlay from '@/hooks/useOverlay';

/** Size guide popup */
export default function SizeGuide({ guide, open, onClose }) {
  useOverlay(open, onClose);
  return (
    <Portal>
    <AnimatePresence>
      {open && guide && (
        <motion.div
          className="fixed inset-0 z-[200] grid place-items-center bg-ink/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-label={guide.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-lift"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl">{guide.title}</h2>
                <p className="mt-1 text-sm text-muted">{guide.note}</p>
              </div>
              <button type="button" onClick={onClose} aria-label="Close size guide" className="grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-blush">
                <HiXMark size={20} />
              </button>
            </div>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
              <table className="w-full text-left text-sm">
                <thead className="bg-blush text-ink">
                  <tr>
                    {guide.head.map((h) => (
                      <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {guide.rows.map((r) => (
                    <tr key={r[0]} className="border-t border-line">
                      {r.map((c, i) => (
                        <td key={i} className={`px-4 py-3 ${i === 0 ? 'font-medium text-ink' : 'text-ink-soft'}`}>{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </Portal>
  );
}
