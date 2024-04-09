import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, VStack, Text, Image } from "@chakra-ui/react";
import { FaPlus, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const API_URL = "https://backengine-k7g6.fly.dev";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [ean, setEan] = useState("");
  const [sentence, setSentence] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [geolocation, setGeolocation] = useState("");
  const [product, setProduct] = useState(null);

  const handleLogin = async () => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setAccessToken(data.accessToken);
    } else {
      alert("Login failed");
    }
  };

  const handleCreateProduct = async () => {
    const response = await fetch(`${API_URL}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        ean: parseInt(ean),
        sentence,
        picture_url: pictureUrl,
        date,
        price: parseFloat(price),
        geolocation,
      }),
    });

    if (response.ok) {
      alert("Product created");
    } else {
      alert("Product creation failed");
    }
  };

  const handleGetProduct = async () => {
    const response = await fetch(`${API_URL}/product/${ean}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setProduct(data);
    } else {
      alert("Failed to get product");
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        {!accessToken ? (
          <>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Button leftIcon={<FaSignInAlt />} onClick={handleLogin}>
              Login
            </Button>
          </>
        ) : (
          <>
            <Text>Logged in</Text>
            <FormControl>
              <FormLabel>EAN</FormLabel>
              <Input type="number" value={ean} onChange={(e) => setEan(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Sentence</FormLabel>
              <Input value={sentence} onChange={(e) => setSentence(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Picture URL</FormLabel>
              <Input value={pictureUrl} onChange={(e) => setPictureUrl(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Geolocation</FormLabel>
              <Input value={geolocation} onChange={(e) => setGeolocation(e.target.value)} />
            </FormControl>
            <Button leftIcon={<FaPlus />} onClick={handleCreateProduct}>
              Create Product
            </Button>
            <Button onClick={handleGetProduct}>Get Product</Button>
            {product && (
              <Box>
                <Text>EAN: {product.ean}</Text>
                <Text>Sentence: {product.sentence}</Text>
                <Image src={product.picture_url} alt="Product" />
                <Text>Date: {product.date}</Text>
                <Text>Price: {product.price}</Text>
                <Text>Geolocation: {product.geolocation}</Text>
              </Box>
            )}
            <Button leftIcon={<FaSignOutAlt />} onClick={() => setAccessToken("")}>
              Logout
            </Button>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default Index;
