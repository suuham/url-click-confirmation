/**
 * CSVダウンロード用の件数入力コンポーネント
 *
 * 主な仕様:
 * - 最新から指定件数分のデータを取得するためのUI
 * - 入力値のバリデーション
 * - 適切なラベル表示
 *
 * 制限事項:
 * - 最大50000件まで
 * - 0件以上の入力必須
 */
import type React from "react";
import styles from "./index.module.scss";

interface DownloadLimitInputProps {
	/** 現在の件数入力値 */
	value: number;
	/** 件数変更時のコールバック */
	onChange: (value: number) => void;
	/** エラーメッセージ */
	error?: string;
}

/**
 * CSVダウンロード件数入力コンポーネント
 *
 * @param value - 現在の入力値
 * @param onChange - 入力値変更時の処理
 * @param error - エラーメッセージ
 */
export function DownloadLimitInput({
	value,
	onChange,
	error,
}: DownloadLimitInputProps) {
	/**
	 * 入力値変更処理
	 * テキスト入力を数値に変換して処理
	 *
	 * @param event - 入力イベント
	 */
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;

		// 空文字列の場合は0を設定
		if (inputValue === "") {
			onChange(0);
			return;
		}

		// 数値に変換
		const newValue = Number.parseInt(inputValue, 10);

		// 有効な数値の場合のみ更新
		if (!Number.isNaN(newValue) && newValue >= 0) {
			onChange(newValue);
		}
	};

	return (
		<div className={styles["download-limit-input"]}>
			<label htmlFor="download-limit" className={styles["label"]}>
				取得件数（最新から）
			</label>
			<div className={styles["input-container"]}>
				<input
					id="download-limit"
					value={value}
					onChange={handleInputChange}
					className={styles["input"]}
					placeholder="件数を入力（例: 1000）"
				/>
				<span className={styles["unit"]}>件</span>
			</div>
			{error && <p className={styles["error-message"]}>{error}</p>}
		</div>
	);
}
