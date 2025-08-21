
import { Header } from '@/components/header';
import { MainNav } from '@/components/main-nav';
import { UserProfileCard } from '@/components/profile/user-profile-card';
import { TrendsChart } from '@/components/profile/trends-chart';

export default function ProfilePage() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <MainNav />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-3 md:gap-8">
            <div className="md:col-span-1">
              <UserProfileCard />
            </div>
            <div className="md:col-span-2">
              <TrendsChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
