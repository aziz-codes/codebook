import DiscussionCard from "@/components/discussion-card";
import DiscussionHeader from "@/components/discussion-header";

const Discussions = () => {
  return (
    <div className="flex  flex-col xl:items-start items-center gap-3">
      <DiscussionHeader />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        <DiscussionCard />
        <DiscussionCard />
        <DiscussionCard />
        <DiscussionCard />
        <DiscussionCard />
        <DiscussionCard />
        <DiscussionCard />
        <DiscussionCard />
        <DiscussionCard />
        <DiscussionCard />
        <DiscussionCard />
        <DiscussionCard />
        <DiscussionCard />
        <DiscussionCard />
        <DiscussionCard />
        <DiscussionCard />
        <DiscussionCard />
      </div>
    </div>
  );
};

export default Discussions;
