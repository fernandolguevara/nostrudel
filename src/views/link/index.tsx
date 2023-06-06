import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import { Navigate, useParams } from "react-router-dom";
import { nip19 } from "nostr-tools";

export default function NostrLinkView() {
  const { link } = useParams() as { link?: string };

  if (!link)
    return (
      <Alert status="warning">
        <AlertIcon />
        <AlertTitle>No link provided</AlertTitle>
      </Alert>
    );

  const cleanLink = link.replace(/(web\+)?nostr:(\/\/)?/, "");
  const decoded = nip19.decode(cleanLink);

  switch (decoded.type) {
    case "npub":
    case "nprofile":
      return <Navigate to={`/u/${cleanLink}`} replace />;
    case "note":
    case "nevent":
      return <Navigate to={`/n/${cleanLink}`} replace />;
  }

  return (
    <Alert status="warning">
      <AlertIcon />
      <AlertTitle>Unknown type "{decoded.type}"</AlertTitle>
    </Alert>
  );
}
