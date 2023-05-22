-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2023 at 04:02 PM
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
(16, 49, '1', '1', '1'),
(17, 50, '1', '1', '1'),
(20, 56, 'Horror', 'hdjkashf', 'Mahir'),
(21, 57, '1', '1', '1'),
(22, 62, '1', '1', '1'),
(23, 63, '1', '1', '1'),
(24, 64, '1', '1', '1'),
(26, 66, '1', '1', '1');

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
(10, '2023-04-21 12:30:47', 4, '201.90', 'Ordered', 27),
(11, '2023-04-21 21:32:21', 5, '2.00', 'Ordered', 28),
(12, '2023-04-21 21:33:20', 3, '99.95', 'Ordered', 28),
(17, '2023-04-25 11:59:47', 4, '3.85', 'Ordered', 29),
(18, '2023-04-25 12:31:37', 6, '191.90', 'Ordered', 29),
(19, '2023-04-26 12:31:15', 2, '1.90', 'Pending', 29),
(20, '2023-04-26 12:35:31', 0, '0.00', 'Pending', 27),
(21, '2023-04-26 12:37:21', 0, '0.00', 'Pending', 28);

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
(10, 49, '2023-04-26 12:35:21', 2, '191.90'),
(10, 53, '2023-04-26 12:35:19', 2, '10.00'),
(12, 49, '2023-04-26 12:37:04', 1, '95.95'),
(12, 50, '2023-04-26 12:37:06', 1, '1.00'),
(12, 52, '2023-04-26 12:37:12', 1, '3.00'),
(17, 38, '2023-04-25 12:13:10', 1, '1.00'),
(17, 50, '2023-04-25 12:13:17', 2, '1.90'),
(17, 50, '2023-04-25 12:13:20', 1, '0.95'),
(18, 43, '2023-04-26 12:22:11', 2, '0.00'),
(18, 49, '2023-04-26 12:22:22', 2, '191.90'),
(19, 38, '2023-05-16 19:40:45', 2, '1.90');

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
(6, 43, 'a', 'a', 'a', 'a'),
(8, 53, '5', '5', '5', '5'),
(9, 58, '1', '100', '1', '1'),
(10, 59, '1', '1', '1', '1'),
(11, 60, '1', '1', '1', '1');

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
(4, 38, 'Cosmetics', 'a', 'a22'),
(5, 45, 'a', 'a', 'a'),
(6, 52, '3', '3', '3');

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
(27, '2', '$2b$10$cqyW7C99GRCSO01K/f1.Q.iQGG9oZuPhrtS1cBd8D4NzKmnyqWyTS', '2', '2', 'image-1681891274280.1568788430-1206740205d81cfce2b4423-60645169.png', 1, 'Customer'),
(28, 'mahir1', '$2b$10$j7Sl9eYjTuq1AJqnKTiRdewYqN6HAiYCheLuVqhQvmkVJs8XbtQPu', 'Mahir', '01710241003', 'image-1682091141818.images.jpg', 1, 'Customer'),
(29, '1', '$2b$10$4N/iUNdph4TJGzDftHbj5.scVpznVTVekFb7KBg9m/jkDcr2YyQIy', '1', '1', 'image-1682402386982.images.jpg', 1, 'Customer');

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
(1, '11.00', '2023-04-17', 38),
(5, '5.00', '2023-04-27', 49),
(6, '5.00', '2023-04-26', 50),
(11, '5.00', '2023-04-05', 38),
(13, '5.00', '2023-04-27', 43),
(14, '5.00', '2023-05-05', 38),
(15, '5.00', '2023-05-18', 38);

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
(12, 46, 'a', 'a', 'a'),
(13, 51, '2', '2', '2'),
(14, 61, '1', '1', '1');

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
(5, 'Confirmed', '2023-04-21 21:33:20', 'Mahir', 'Dhaka', 'Bashundhara R/a', '01710241003', '2.00', 11, 1, 28, ''),
(10, 'Confirmed', '2023-04-25 12:31:37', '1', 'Dhaka', 'aa', '1', '3.85', 17, 1, 29, '1682404414583'),
(11, 'Confirmed', '2023-04-26 12:31:15', '1', 'Chittagong', 'aa', '1', '191.90', 18, 1, 29, '1682490702722'),
(12, 'Confirmed', '2023-04-26 12:35:31', '2', 'Dhaka', '1', '2', '201.90', 10, 1, 27, '1682491007356'),
(13, 'Cancelled', '2023-04-26 12:37:21', 'Mahir', 'Dhaka', '\'', '01710241003', '99.95', 12, 1, 28, '1682491063340');

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
(38, 'image-1682229861678.png-transparent-cosmetic-cosmetics-product-kind-lip-gloss-cosmetic-thumbnail.png', '1.00', 33, 1, 'a', 'Cosmetics', 6),
(43, 'image-1681635134354.istockphoto-157532000-612x612.jpg', '0.00', 33, 1, 'a', 'Clothes', 9),
(45, 'image-1681657297910.photo-1596462502278-27bfdc403348.jpg', '0.00', 33, 1, 'a', 'Cosmetics', 20),
(46, 'image-1681657306910.83bc2ef0af141fc357641c48b0aca2fe.jpg', '0.00', 33, 1, 'a', 'Electronics', 20),
(49, 'image-1681912002948.six-of-crows-770x1156.jpg', '101.00', 33, 1, '1', 'Books', 200),
(50, 'image-1681723083466.1.jpg', '1.00', 33, 1, '1', 'Books', 16),
(51, 'image-1681723098831.a50-01-500x500.jpg', '2.00', 33, 1, '2', 'Electronics', 20),
(52, 'image-1681723114471.photo-1596462502278-27bfdc403348.jpg', '3.00', 33, 1, '3', 'Cosmetics', 19),
(53, 'image-1681723127111.83bc2ef0af141fc357641c48b0aca2fe.jpg', '5.00', 33, 1, '5', 'Clothes', 18),
(56, 'image-1682094532982.46301955-668x1024.jpg', '12.00', 33, 1, 'Book', 'Books', 0),
(57, 'image-1682515938733.3.jpg', '111.00', 37, 1, '1', 'Books', 1),
(58, 'image-1682517749709.1568788430-1206740205d81cfce2b4423-60645169.png', '1.00', 37, 1, '1', 'Clothes', 1),
(59, 'image-1682517755692.1.jpg', '1.00', 37, 1, '1', 'Clothes', 1),
(60, 'image-1682517761900.istockphoto-157532000-612x612.jpg', '1.00', 37, 1, '1', 'Clothes', 1),
(61, 'image-1682517767580.83bc2ef0af141fc357641c48b0aca2fe.jpg', '1.00', 37, 1, '1', 'Electronics', 1),
(62, 'image-1682518553133.46301955-668x1024.jpg', '1.00', 37, 1, '1', 'Books', 1),
(63, 'image-1682518557651.istockphoto-157532000-612x612.jpg', '1.00', 37, 1, '1', 'Books', 1),
(64, 'image-1682518561931.a50-01-500x500.jpg', '1.00', 37, 1, '1', 'Books', 1),
(66, 'image-1682659146465.images.jpg', '1.00', 33, 1, '1', 'Books', 1);

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

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`ID`, `DateOfReport`, `TextOfReport`, `CustomerID`, `ProductID`, `Image`) VALUES
(20, '2023-05-15', '1', 29, 66, 'image-1682659146465.images.jpg'),
(21, '2023-05-16', '11', 29, 66, 'image-1682659146465.images.jpg');

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
(33, '1', '$2b$10$a5KqvkMLcDIM9icrkvFXF..Ot9aoZY5O1Ga2J8ykwG7JTTz8HkdH6', 'Mahir', '01xxxxxxxxx', 'image-1681583375563.1.png', 1, 'Seller'),
(37, '2', '$2b$10$rU7VIe0oEGGpwJGgmL/mROqJ6qEyoya3Rg1x3nzfuOA2MG8tmvhjm', '2', '2', 'image-1682515925679.1568788430-1206740205d81cfce2b4423-60645169.png', 1, 'Seller');

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `clothes`
--
ALTER TABLE `clothes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `cosmetics`
--
ALTER TABLE `cosmetics`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `discounts`
--
ALTER TABLE `discounts`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `electronics`
--
ALTER TABLE `electronics`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `sellers`
--
ALTER TABLE `sellers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

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
