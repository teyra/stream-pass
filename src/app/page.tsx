import Navbar from "@/components/NavBar";
import { JsonRpcProvider, Wallet } from "ethers";
export default async function Home() {
  const provider = new JsonRpcProvider(
    "https://sepolia.infura.io/v3/2fa9d26902de475a82540bcc7f29acf6"
  );

  const signer = new Wallet(
    "d33dfdda48020d26473cc753aca74d9ea4b3138858d46b92ead72fba86e8446f",
    provider
  );
  console.log("🚀 ~ Home ~ signer:", signer);
  console.log("🚀 ~ Home ~ provider:", provider);
  console.log("Provider network:", await provider.getNetwork());
  return (
    <div>
      <Navbar />
    </div>
  );
}
