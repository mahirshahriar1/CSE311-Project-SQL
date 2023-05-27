-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 27, 2023 at 07:55 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopez`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `ID` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`ID`, `Username`, `Password`, `Type`) VALUES
(1, 'admin', '$2b$10$3D0.43bf4Oeu0RVyfsFQC.2lQRWyFDHUvkI/7uMDkCw6HNKVUEto.', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `ID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `Genre` varchar(255) DEFAULT NULL,
  `Summary` text DEFAULT NULL,
  `Author` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`ID`, `ProductID`, `Genre`, `Summary`, `Author`) VALUES
(27, 69, 'War', 'A vivid, harrowing, and ultimately hopeful re-creation of Lale Sokolov\'s experiences as the man who tattooed the arms of thousands of prisoners with what would become one of the most potent symbols of the Holocaust, The Tattooist of Auschwitz is also a testament to the endurance of love and humanity under the darkest possible conditions.', 'Heather Morris'),
(28, 70, 'Ethnic Real Life', 'In the early 1900s, teenaged Sunja, the adored daughter of a crippled fisherman, falls for a wealthy stranger at the seashore near her home in Korea. He promises her the world, but when she discovers she is pregnant — and that her lover is married — she refuses to be bought. Instead, she accepts an offer of marriage from a gentle, sickly minister passing through on his way to Japan. But her decision to abandon her home, and to reject her son\'s powerful father, sets off a dramatic saga that will echo down through the generations.', 'Min Jin Lee'),
(29, 71, 'Horror', 'Horror Book', 'Stephen King'),
(30, 72, 'Life, Emotional', '', 'Hanya Yanagihara'),
(31, 73, 'Fiction, War', 'Fictional book', 'R.F. Kuang'),
(32, 74, 'Romantic', 'Romantic Book', 'Ali Hazelwood'),
(33, 75, 'Fantasy', '', 'George R.R. Martin'),
(34, 76, 'Fiction', 'fiction', 'Leigh Bardugo');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `ID` int(11) NOT NULL,
  `DateModified` datetime NOT NULL,
  `NumOfProducts` int(11) NOT NULL,
  `TotalPrice` decimal(10,2) NOT NULL,
  `CartStatus` varchar(20) NOT NULL,
  `CustomerID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`ID`, `DateModified`, `NumOfProducts`, `TotalPrice`, `CartStatus`, `CustomerID`) VALUES
(27, '2023-05-27 22:43:23', 3, '176300.00', 'Ordered', 33),
(28, '2023-05-27 22:44:10', 0, '0.00', 'Pending', 34),
(29, '2023-05-27 23:19:45', 3, '176300.00', 'Ordered', 33),
(30, '2023-05-27 23:23:09', 5, '7291.00', 'Ordered', 33),
(31, '2023-05-27 23:26:50', 0, '0.00', 'Pending', 33);

-- --------------------------------------------------------

--
-- Table structure for table `cart_product`
--

CREATE TABLE `cart_product` (
  `CartID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `DateAdded` datetime NOT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_product`
--

INSERT INTO `cart_product` (`CartID`, `ProductID`, `DateAdded`, `Quantity`, `Price`) VALUES
(27, 73, '2023-05-27 23:19:27', 1, '650.00'),
(27, 73, '2023-05-27 23:19:31', 1, '650.00'),
(27, 95, '2023-05-27 23:19:20', 1, '175000.00'),
(29, 73, '2023-05-27 23:22:51', 1, '650.00'),
(29, 73, '2023-05-27 23:22:53', 1, '650.00'),
(29, 95, '2023-05-27 23:22:32', 1, '175000.00'),
(30, 69, '2023-05-27 23:26:40', 1, '741.00'),
(30, 71, '2023-05-27 23:26:16', 1, '550.00'),
(30, 71, '2023-05-27 23:26:18', 1, '550.00'),
(30, 84, '2023-05-27 23:26:26', 1, '450.00'),
(30, 93, '2023-05-27 23:26:07', 1, '5000.00');

-- --------------------------------------------------------

--
-- Table structure for table `clothes`
--

CREATE TABLE `clothes` (
  `ID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `Color` varchar(255) DEFAULT NULL,
  `Brand` varchar(255) DEFAULT NULL,
  `Size` varchar(255) DEFAULT NULL,
  `Material` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clothes`
--

INSERT INTO `clothes` (`ID`, `ProductID`, `Color`, `Brand`, `Size`, `Material`) VALUES
(13, 77, 'Navy Blue', 'Random', 'S', 'Cotton'),
(14, 78, 'Blue', 'Random', '34', 'Stitch'),
(15, 79, 'Faded Black', 'Nike', 'Regular', 'Cotton'),
(16, 80, 'Black', 'Random', 'M', 'Cotton'),
(17, 81, 'Blue', 'Random', 'L', 'Fabric'),
(18, 82, 'Blue', 'Random', 'L', 'Jeans'),
(19, 83, 'Black', 'John Wick', 'Any', 'Best'),
(20, 84, 'Black', 'none', 'S,L,M', 'Cotton');

-- --------------------------------------------------------

--
-- Table structure for table `cosmetics`
--

CREATE TABLE `cosmetics` (
  `ID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `Type` varchar(255) DEFAULT NULL,
  `Brand` varchar(255) DEFAULT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cosmetics`
--

INSERT INTO `cosmetics` (`ID`, `ProductID`, `Type`, `Brand`, `Description`) VALUES
(8, 85, 'None', 'None', 'None'),
(9, 86, 'None', 'None', 'None'),
(10, 87, 'None', 'None', 'None'),
(11, 88, 'None', 'None', 'None');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `ID` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Phone` varchar(255) NOT NULL,
  `Image` varchar(255) DEFAULT NULL,
  `AdminID` int(11) NOT NULL,
  `Type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`ID`, `Username`, `Password`, `Name`, `Phone`, `Image`, `AdminID`, `Type`) VALUES
(33, '1', '$2b$10$.Rp5E6b7R0wR/QTIAazg.eKLkdH0M/oMMz6U3pk1foT6AFqLI5JSm', 'Mahir', '01710241002', 'image-1685205803891.1.png', 1, 'Customer'),
(34, '2', '$2b$10$naj8leXuAjUxL/2jEaasfuPPuhyi/Vmf5ZlfXEx4aXhW1w3JXRC32', 'Temp', '12345678911', 'image-1685205849963.female.png', 1, 'Customer');

-- --------------------------------------------------------

--
-- Table structure for table `discounts`
--

CREATE TABLE `discounts` (
  `ID` int(11) NOT NULL,
  `Percentage` decimal(5,2) NOT NULL,
  `ExpirationDate` date NOT NULL,
  `ProductID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `discounts`
--

INSERT INTO `discounts` (`ID`, `Percentage`, `ExpirationDate`, `ProductID`) VALUES
(19, '5.00', '2023-05-28', 69);

-- --------------------------------------------------------

--
-- Table structure for table `electronics`
--

CREATE TABLE `electronics` (
  `ID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `Specification` text DEFAULT NULL,
  `Type` varchar(255) DEFAULT NULL,
  `Brand` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `electronics`
--

INSERT INTO `electronics` (`ID`, `ProductID`, `Specification`, `Type`, `Brand`) VALUES
(15, 89, ' Core i9 13th Gen 64GB RAM 4TB SSD RTX 4090 16GB Graphics 17.3\" 4K UHD 144Hz Gaming Laptop', 'Laptop', 'MSI'),
(16, 90, 'Intel Core i5-11400 11th Gen Gaming PC', 'PC', 'Intel'),
(17, 91, 'W810 20MP,6X ZOOM HD DIGITAL CAMERA', 'Camera', 'Sony'),
(18, 92, '1200mbps Dual-Band Wireless MU-MIMO Gigabit', 'WIFI ROUTER', 'TP LINK'),
(19, 93, 'BO12 Power', 'Headphone', 'BOROFONE '),
(20, 94, 'RED BLUE BROWN SWITCHES', 'Keyboards', 'RedDragon'),
(21, 95, '49\" 240HZ', 'Monitor', 'Samsung');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `ID` int(11) NOT NULL,
  `OrderStatus` varchar(20) NOT NULL,
  `DateOfOrder` datetime NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Region` varchar(255) NOT NULL,
  `Address` varchar(200) NOT NULL,
  `Phone` varchar(255) NOT NULL,
  `TotalAmount` decimal(10,2) NOT NULL,
  `CartID` int(11) NOT NULL,
  `AdminID` int(11) NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `DateOfProcess` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`ID`, `OrderStatus`, `DateOfOrder`, `Name`, `Region`, `Address`, `Phone`, `TotalAmount`, `CartID`, `AdminID`, `CustomerID`, `DateOfProcess`) VALUES
(16, 'Confirmed', '2023-05-27 23:19:45', 'Mahir', 'Dhaka', 'Bashundhara', '01710241002', '176300.00', 27, 1, 33, '1685208225433'),
(17, 'Cancelled', '2023-05-27 23:23:09', 'Mahir', 'Dhaka', 'Bashundhara', '01710241002', '176300.00', 29, 1, 33, '1685208220297'),
(18, 'Confirmed', '2023-05-27 23:26:50', 'Mahir', 'Dhaka', 'Mohammadpur', '01710241002', '7291.00', 30, 1, 33, '1685208437879');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `ID` int(11) NOT NULL,
  `Image` varchar(255) DEFAULT NULL,
  `Price` decimal(10,2) NOT NULL,
  `SellerID` int(11) NOT NULL,
  `AdminID` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Type` varchar(255) DEFAULT NULL,
  `Quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ID`, `Image`, `Price`, `SellerID`, `AdminID`, `Name`, `Type`, `Quantity`) VALUES
(69, 'image-1685206208755.81lfY0CFyaL._AC_UF1000,1000_QL80_.jpg', '780.00', 39, 1, 'The Tattooist of Auschwitz', 'Books', 19),
(70, 'image-1685206353610.81Z-DV78CnL.jpg', '1010.00', 39, 1, 'Pachinko', 'Books', 27),
(71, 'image-1685206410625.91ndIrptO4L._AC_UF1000,1000_QL80_.jpg', '550.00', 39, 1, 'Pet Sematary', 'Books', 13),
(72, 'image-1685206453905.22822858.jpg', '800.00', 39, 1, 'A Little Life', 'Books', 35),
(73, 'image-1685206490329.41118857.jpg', '650.00', 39, 1, 'Dragon Republic', 'Books', 9),
(74, 'image-1685206517700.56732449.jpg', '555.00', 39, 1, 'Love Hypothesis', 'Books', 67),
(75, 'image-1685206561562.d0c2639b268bf7d68b9d283890970297.jpg', '5000.00', 40, 1, 'Game of Thrones Set', 'Books', 10),
(76, 'image-1685206601680.shadow-bone.jpg', '768.00', 40, 1, 'Shadow And Bone', 'Books', 16),
(77, 'image-1685206896786.61LVvVBG3wL.jpg', '300.00', 40, 1, 'Baby Cloth', 'Clothes', 30),
(78, 'image-1685206921690.515xUyK4NZL._AC_UX569_.jpg', '505.00', 40, 1, 'Jeans for Girl', 'Clothes', 120),
(79, 'image-1685206973233.614kd70ICrL._AC_UX569_.jpg', '750.00', 40, 1, 'Nike Shorts', 'Clothes', 122),
(80, 'image-1685207001680.alstyle_1301_black.jpg', '300.00', 40, 1, 'Tshirt', 'Clothes', 19),
(81, 'image-1685207083911.Mens_Corporate_Shirt_Long_Sleeve_Float_Navy-875x1000.jpg', '500.00', 40, 1, 'Shirt', 'Clothes', 12),
(82, 'image-1685207224232.499an-active-jeans-black-2-a1.jpg', '400.00', 40, 1, 'Jeans (Male)', 'Clothes', 81),
(83, 'image-1685207271346.61muqf59+-L.jpg', '40000.00', 40, 1, 'John Wick Suit', 'Clothes', 2),
(84, 'image-1685207349361.Capture.JPG', '450.00', 40, 1, 'FRIENDS Tshirt', 'Clothes', 354),
(85, 'image-1685207452855.166128-photos-product-cosmetics-free-download-png-hd.jpg', '1000.00', 40, 1, 'Cosmetics-1', 'Cosmetics', 73),
(86, 'image-1685207468399.istockphoto-487770577-612x612.jpg', '1999.00', 40, 1, 'Cosmetics-2', 'Cosmetics', 88),
(87, 'image-1685207484632.istockphoto-656296680-612x612.jpg', '1077.00', 40, 1, 'Cosmetics-3', 'Cosmetics', 7),
(88, 'image-1685207500447.rare-beauty-first-look-products.jpg', '500.00', 40, 1, 'Cosmetics-4', 'Cosmetics', 17),
(89, 'image-1685207586638.Capture.JPG', '774900.00', 40, 1, 'MSI Titan GT77HX 13VI ', 'Electronics', 2),
(90, 'image-1685207641824.2.JPG', '90000.00', 39, 1, 'Intel Core i5-11400 11th Gen Gaming PC', 'Electronics', 19),
(91, 'image-1685207692055.3.JPG', '23000.00', 39, 1, 'SONY CYBER-SHOT ', 'Electronics', 8),
(92, 'image-1685207729503.4.JPG', '3150.00', 39, 1, 'TP-Link Archer C64 AC1200 ', 'Electronics', 15),
(93, 'image-1685207768814.borofone-bo12-power-bt-headset-headphones.jpg', '5000.00', 39, 1, 'Wireless headphones ', 'Electronics', 6),
(94, 'image-1685207823310.5.JPG', '5000.00', 39, 1, 'Mechanical Keyboards', 'Electronics', 18),
(95, 'image-1685207883383.c49g95tssw-1-500x500.jpg', '175000.00', 39, 1, 'Samsung Odyssey  G9', 'Electronics', 3);

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `ID` int(11) NOT NULL,
  `DateOfReport` date NOT NULL,
  `TextOfReport` text NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `Image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sellers`
--

CREATE TABLE `sellers` (
  `ID` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Phone` varchar(255) NOT NULL,
  `Image` varchar(255) DEFAULT NULL,
  `AdminID` int(11) NOT NULL,
  `Type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sellers`
--

INSERT INTO `sellers` (`ID`, `Username`, `Password`, `Name`, `Phone`, `Image`, `AdminID`, `Type`) VALUES
(39, '1', '$2b$10$uYYISEdBxcGV.//Q6QqrTuFo1fjKhUa1H.BleR4NBcOLs.GgTXtVi', 'Mahir', '01710241002', 'image-1685205517403.1.png', 1, 'Seller'),
(40, '2', '$2b$10$tszJ9fvfCcfD9NwQxiyzxOEPu8h6cQ/dFq7wRI7nnopPhp2uTGFGa', 'Megha', '01789127648', 'image-1685206291834.female.png', 1, 'Seller');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `CustomerID` (`CustomerID`);

--
-- Indexes for table `cart_product`
--
ALTER TABLE `cart_product`
  ADD PRIMARY KEY (`CartID`,`ProductID`,`DateAdded`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `clothes`
--
ALTER TABLE `clothes`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `cosmetics`
--
ALTER TABLE `cosmetics`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `AdminID` (`AdminID`);

--
-- Indexes for table `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `electronics`
--
ALTER TABLE `electronics`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `CartID` (`CartID`),
  ADD KEY `AdminID` (`AdminID`),
  ADD KEY `CustomerID` (`CustomerID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `SellerID` (`SellerID`),
  ADD KEY `AdminID` (`AdminID`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `CustomerID` (`CustomerID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Indexes for table `sellers`
--
ALTER TABLE `sellers`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `AdminID` (`AdminID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `clothes`
--
ALTER TABLE `clothes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `cosmetics`
--
ALTER TABLE `cosmetics`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `discounts`
--
ALTER TABLE `discounts`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `electronics`
--
ALTER TABLE `electronics`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `sellers`
--
ALTER TABLE `sellers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `cart_product`
--
ALTER TABLE `cart_product`
  ADD CONSTRAINT `cart_product_ibfk_1` FOREIGN KEY (`CartID`) REFERENCES `carts` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_product_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `clothes`
--
ALTER TABLE `clothes`
  ADD CONSTRAINT `clothes_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `cosmetics`
--
ALTER TABLE `cosmetics`
  ADD CONSTRAINT `cosmetics_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`AdminID`) REFERENCES `admin` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `discounts`
--
ALTER TABLE `discounts`
  ADD CONSTRAINT `discounts_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `electronics`
--
ALTER TABLE `electronics`
  ADD CONSTRAINT `electronics_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`CartID`) REFERENCES `carts` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`AdminID`) REFERENCES `admin` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`SellerID`) REFERENCES `sellers` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`AdminID`) REFERENCES `admin` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `sellers`
--
ALTER TABLE `sellers`
  ADD CONSTRAINT `sellers_ibfk_1` FOREIGN KEY (`AdminID`) REFERENCES `admin` (`ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
