export default function Spinner({ size = 24 }: { size?: number }) {
    return (
        <div
            className='animate-spin rounded-full border border-gray-300 border-t-gray-600'
            style={{ width: size, height: size }}
        />
    );
}
