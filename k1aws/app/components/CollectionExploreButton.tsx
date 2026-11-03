"use client";

type CollectionExploreButtonProps = {
  className: string;
  tierName: string;
};

export default function CollectionExploreButton({ className, tierName }: CollectionExploreButtonProps) {
  const exploreTier = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.dispatchEvent(new CustomEvent("k1aws:select-tier", { detail: { tierName } }));
  };

  return <button className={className} type="button" onClick={exploreTier}>Explore <b aria-hidden="true">→</b></button>;
}
