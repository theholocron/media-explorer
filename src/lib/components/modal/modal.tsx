import * as React from "react";
import { createPortal } from "react-dom";

export interface ModalProps {
	children: React.ReactNode;
	onClose: () => void;
}

export function Modal(props: MediaModalProps) {
	const { children, onClose } = props;
	const [mounted, setMounted] = React.useState<boolean>(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	React.useEffect(() => {
		document.body.classList.add("modal-open");

		return () => {
			document.body.classList.remove("modal-open");
		};
	}, []);

	if (!mounted) return null;

	return createPortal(
		<div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<button className="close-btn" onClick={onClose}>
					&times;
				</button>
				{children}
			</div>
		</div>,
		document.body
	);
}
