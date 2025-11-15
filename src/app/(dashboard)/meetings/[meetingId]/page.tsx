const Page = ({ params }: { params: { meetingId: string } }) => {
    return (
        <div>
            <h1>Meeting {params.meetingId}</h1>
        </div>
    )
}

export default Page
