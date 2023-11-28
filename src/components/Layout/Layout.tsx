import Header from './Header';

const Layout = ({ children }: React.PropsWithChildren): JSX.Element => (
  <>
    <div className="flex h-full bg-zinc-50 fixed inset-0 flex justify-center sm:px-8">
      <div className="flex w-full max-w-7xl lg:px-8">
        <div className="w-full bg-white ring-1 ring-zinc-100" />
      </div>
    </div>
    <div className="relative flex w-full flex-col">
      <div className="sm:px-8">
        <div className="mx-auto w-full max-w-7xl lg:px-8">
          <div className="relative px-4 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-2xl lg:max-w-5xl">
              <Header />
            </div>
            <main className="flex-auto lg:mt-20 mt-12">
              <div className="mx-auto max-w-2xl lg:max-w-5xl">
                <div className="mx-auto max-w-2xl">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Layout;
