import { PrimaryButton } from "@/components/buttons/primary-button/PrimaryButton";
import "./PlayerCardSkeleton.sass";

export const PlayerCardSkeleton = () => {
  return (
    <div className="playerCardSkeleton">
      <div className="img"></div>
      <div className="aside">
        <h3 className="title"></h3>
        <PrimaryButton profileButton />
      </div>
    </div>
  );
};
