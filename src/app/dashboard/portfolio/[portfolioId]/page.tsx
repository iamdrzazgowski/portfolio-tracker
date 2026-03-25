export default async function Page({ params }) {
    const test = await params;
    console.log(await params);
    return <div>Page</div>;
}
