export default function Loading() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div
        className='h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]'
        role='status'
      >
        <span className='absolute! -m-px! h-px! w-px! overflow-hidden! border-0! p-0! whitespace-nowrap! [clip:rect(0,0,0,0)]!'>
          Loading...
        </span>
      </div>
    </div>
  );
}
