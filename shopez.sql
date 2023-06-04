-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2023 at 07:37 PM
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
(38, 188, 'Non-Fiction', 'Random', 'Random'),
(39, 189, 'Non-Fiction', 'Random', 'Random'),
(40, 190, 'Non-Fiction', 'Random', 'Random'),
(41, 191, 'Non-Fiction', 'Random', 'Random'),
(42, 192, 'Non-Fiction', 'Random', 'Random'),
(43, 193, 'Non-Fiction', 'Random', 'Random'),
(44, 194, 'Non-Fiction', 'Random', 'Random'),
(45, 195, 'Non-Fiction', 'Random', 'Random'),
(46, 196, 'Horror', 'Random', 'Random'),
(47, 197, 'Horror', 'Random', 'Random'),
(48, 198, 'Horror', 'Random', 'Random'),
(49, 199, 'Horror', 'Random', 'Random'),
(50, 200, 'Horror', 'Random', 'Random'),
(51, 201, 'Horror', 'Random', 'Random'),
(52, 202, 'Horror', 'Random', 'Random'),
(53, 203, 'Romantic', 'Random', 'Random'),
(54, 204, 'Romantic', 'Random', 'Random'),
(55, 205, 'Romantic', 'Random', 'Random'),
(56, 206, 'Romantic', 'Random', 'Random'),
(57, 207, 'Romantic', 'Romantic 5', 'Random'),
(58, 208, 'Romantic', 'Romantic 5', 'Random'),
(59, 209, 'Romantic', 'Romantic 7', 'Random'),
(60, 210, 'Fantasy', 'Fantasy 1', 'Random'),
(61, 211, 'Fantasy', 'Fantasy 2', 'Random'),
(62, 212, '', 'Fantasy 3 SET', 'Ra'),
(63, 213, 'Fantasy', 'Fantasy 3 SET', 'Random'),
(64, 214, 'Fantasy', 'Random', 'Random'),
(65, 215, 'Fantasy', 'Random', 'Random'),
(66, 216, 'Fantasy', 'Random', 'Random'),
(67, 217, 'Children', 'Random', 'Random'),
(68, 218, 'Children', 'Random', 'Random'),
(69, 219, 'Children', 'Random', 'Random'),
(70, 220, 'Children', 'Random', 'Random');

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
(28, '2023-05-27 22:44:10', 1, '5000.00', 'Ordered', 34),
(29, '2023-05-27 23:19:45', 3, '176300.00', 'Ordered', 33),
(30, '2023-05-27 23:23:09', 5, '7291.00', 'Ordered', 33),
(31, '2023-05-27 23:26:50', 1, '1999.00', 'Ordered', 33),
(32, '2023-05-28 00:03:10', 0, '0.00', 'Pending', 34),
(33, '2023-05-29 16:43:54', 1, '1.00', 'Ordered', 33),
(34, '2023-05-30 02:43:23', 1, '450.00', 'Pending', 33);

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
(34, 120, '2023-06-04 09:13:01', 1, '450.00');

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
(21, 106, 'Black', 'Random', '45', 'Female'),
(22, 107, 'Green', 'Random', '47', 'Female'),
(23, 108, 'Cyan', 'Random', 'N/A', 'Female'),
(24, 109, 'Random', 'Random', 'Random', 'Female'),
(25, 110, 'Random', 'Random', 'Random', 'Female'),
(26, 111, 'Random', 'Random', 'Random', 'Female'),
(27, 112, 'Random', 'Random', 'Random', 'Female'),
(28, 113, 'Yellow', 'Random', 'Random', 'Female'),
(29, 114, 'Light Blue', 'Random', 'Random', 'Female'),
(30, 115, 'Any', 'Random', 'Random', 'Female'),
(31, 116, 'Black', 'Random', 'Random', 'Male'),
(32, 117, 'Random', 'Random', 'Random', 'Male'),
(33, 118, 'Random', 'Random', 'Random', 'Male'),
(34, 119, 'Random', 'Random', 'Random', 'Male'),
(35, 120, 'Random', 'Random', 'Random', 'Male'),
(36, 121, 'Random', 'Random', 'Random', 'Male'),
(37, 122, 'Random', 'Random', 'Random', 'Male'),
(38, 123, 'Random`', 'Random', 'Random', 'Male'),
(39, 124, 'Random', 'Random', 'Random', 'Children'),
(40, 125, 'Random', 'Random', 'Random', 'Children'),
(41, 126, 'Random', 'Random', 'Random', 'Children'),
(42, 127, 'Random', 'Random', 'Random', 'Children'),
(43, 128, 'Random', 'Random', 'Random', 'Children'),
(44, 129, 'Random', 'Random', 'Random', 'Children'),
(45, 130, 'Random', 'Random', 'Random', 'Children'),
(46, 131, 'Random', 'Random', 'Random', 'Children'),
(47, 132, 'Random', 'Random', 'Random', 'Children'),
(48, 133, 'Random', 'Random', 'Random', 'Children');

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
(14, 135, 'Fragrance', 'Random', 'Random'),
(15, 136, 'Fragrance', 'Random', 'Random'),
(16, 137, 'Fragrance', 'Random', 'Random'),
(17, 138, 'Fragrance', 'Random', 'Random'),
(18, 139, 'Fragrance', 'Random', 'Random'),
(19, 140, 'Fragrance', 'Random', 'Random'),
(20, 141, 'Fragrance', 'Random', 'Random'),
(21, 142, 'Fragrance', 'Random', 'Random'),
(22, 143, 'HairCare', 'Random', 'Random'),
(23, 144, 'HairCare', 'Random', 'Random'),
(24, 145, 'HairCare', 'Random', 'Random'),
(25, 146, 'HairCare', 'Random', 'Random'),
(26, 147, 'HairCare', 'Random', 'Random'),
(27, 148, 'HairCare', 'Random', 'Random'),
(28, 149, 'HairCare', 'Random', 'Random'),
(29, 150, 'Makeup', 'Random', 'HairCare'),
(30, 151, 'Makeup', 'HairCare', 'HairCare'),
(31, 152, 'Makeup', 'HairCare', 'HairCare'),
(32, 153, 'HairCare', 'HairCare', 'HairCare'),
(33, 154, 'Makeup', 'HairCare', 'HairCare'),
(34, 155, 'Men', 'HairCare', 'HairCare'),
(35, 156, 'Men', 'HairCare', 'HairCare'),
(36, 157, 'Men', 'Random', 'Random'),
(37, 158, 'SkinCare', 'Random', 'Random'),
(38, 159, 'SkinCare', 'Random', 'Random'),
(39, 160, 'SkinCare', 'Random', 'Random'),
(40, 161, 'SkinCare', 'Random', 'Random'),
(41, 162, 'SkinCare', 'Random', 'Random'),
(42, 163, 'SkinCare', 'Random', 'Random');

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
(21, '12.00', '2023-06-15', 106),
(22, '5.00', '2023-06-21', 111),
(23, '17.00', '2023-06-23', 177),
(24, '5.00', '2023-06-09', 146),
(25, '5.00', '2023-06-23', 188),
(26, '11.00', '2023-06-22', 245),
(27, '7.00', '2023-06-13', 240),
(28, '5.00', '2023-06-06', 235),
(29, '5.00', '2023-06-14', 231);

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
(22, 221, 'Random', 'Office-Equipments', 'Random'),
(23, 222, 'Random', 'Office-Equipments', 'Random'),
(24, 223, 'Random', 'Office-Equipments', 'Random'),
(25, 224, 'Random', 'Office-Equipments', 'Random'),
(26, 225, 'Random', 'Office-Equipments', 'Random'),
(27, 226, 'random', 'PC', 'random'),
(28, 227, 'Random', 'PC', 'Random'),
(29, 228, 'Random', 'PC', 'Random'),
(30, 229, 'Random', 'PC', 'Random'),
(31, 230, 'Random', 'PC', 'Random'),
(32, 231, 'Random', 'PC', 'Random'),
(33, 232, 'Random', 'PC', 'Random'),
(35, 234, 'Random', 'Laptop', 'Random'),
(36, 235, 'Random', 'Laptop', 'Random'),
(37, 236, 'Random', 'Laptop', 'Random'),
(38, 237, 'Random', 'Laptop', 'Random'),
(39, 238, 'Random', 'Others', 'Random'),
(40, 239, 'Random', 'Others', 'Random'),
(41, 240, 'Random', 'Others', 'Random'),
(42, 241, 'Random', 'Others', 'Random'),
(43, 242, 'Random', 'Phone', 'Random'),
(44, 243, 'Random', 'Phone', 'Random'),
(46, 245, 'Random', 'Phone', 'Random'),
(47, 246, 'Random', 'Phone', 'random');

-- --------------------------------------------------------

--
-- Table structure for table `furnitures`
--

CREATE TABLE `furnitures` (
  `ID` int(11) NOT NULL,
  `ProductID` int(11) DEFAULT NULL,
  `Type` varchar(255) DEFAULT NULL,
  `Brand` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Color` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `furnitures`
--

INSERT INTO `furnitures` (`ID`, `ProductID`, `Type`, `Brand`, `Description`, `Color`) VALUES
(5, 164, 'Office', 'Random', 'Random', 'Random'),
(6, 165, 'Office', 'Random', 'Random', 'Random'),
(7, 166, 'Office', 'Random', 'Random', 'Random'),
(8, 167, 'Office', 'Random', 'Random', 'Random'),
(9, 168, 'Office', 'Random', 'Random', 'Random'),
(10, 169, 'Office', 'Random', 'Random', 'Random'),
(11, 170, 'Office', 'Random', 'Random', 'Random'),
(19, 178, 'Home', 'Random', 'Random', 'Random'),
(20, 179, 'Home', 'Random', 'Random', 'Random'),
(21, 180, 'Home', 'Random', 'Random', 'Random'),
(22, 181, 'Home', 'Random', 'Random', 'Random'),
(23, 182, 'Home', 'Random ', 'Random ', 'Random '),
(24, 183, 'Home', 'Random ', 'Random ', 'Random '),
(25, 184, 'Home', 'Random ', 'Random ', 'Random '),
(26, 185, 'Outdoor', 'Random', 'Random', 'Random'),
(27, 186, 'Outdoor', 'Random', 'Random', 'Random'),
(28, 187, 'Outdoor', 'Random', 'Random', 'Random');

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
(16, 'Delivered', '2023-05-27 23:19:45', 'Mahir', 'Dhaka', 'Bashundhara', '01710241002', '176300.00', 27, 1, 33, '2023-05-29'),
(17, 'Cancelled', '2023-05-27 23:23:09', 'Mahir', 'Dhaka', 'Bashundhara', '01710241002', '176300.00', 29, 1, 33, '1685208220297'),
(18, 'Cancelled', '2023-05-27 23:26:50', 'Mahir', 'Dhaka', 'Mohammadpur', '01710241002', '7291.00', 30, 1, 33, '2023-06-01'),
(19, 'Confirmed', '2023-05-28 00:03:10', 'Temp', 'Chittagong', 'ctg', '12345678911', '5000.00', 28, 1, 34, '2023-05-28'),
(20, 'Delivery', '2023-05-29 16:43:54', 'Mahir', 'Chittagong', 'ss', '01710241002', '1999.00', 31, 1, 33, '2023-05-29'),
(21, 'Cancelled', '2023-05-30 02:43:23', 'Mahir', 'Chittagong', '1', '01710241002', '1.00', 33, 1, 33, '2023-06-01');

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
(106, 'image-1685558354074.female (1).jpg', '1000.00', 41, 1, 'Product 1', 'Clothes', 13),
(107, 'image-1685558380657.female (2).jpg', '1700.00', 41, 1, 'Salwar Kameez', 'Clothes', 18),
(108, 'image-1685558410608.female (3).jpg', '2500.00', 41, 1, 'Saree', 'Clothes', 10),
(109, 'image-1685558431425.female (4).jpg', '500.00', 41, 1, 'Product', 'Clothes', 5),
(110, 'image-1685558454073.female (5).jpg', '700.00', 41, 1, 'Sweater', 'Clothes', 8),
(111, 'image-1685558471696.female (6).jpg', '1200.00', 41, 1, 'Korean', 'Clothes', 12),
(112, 'image-1685558494601.female (7).jpg', '800.00', 41, 1, 'Jeans', 'Clothes', 12),
(113, 'image-1685558515495.female (8).jpg', '999.00', 41, 1, 'Yellow Kurti', 'Clothes', 12),
(114, 'image-1685558537970.female (10).jpg', '800.00', 41, 1, 'Oversized tshirt', 'Clothes', 22),
(115, 'image-1685558550921.female (9).jpg', '200.00', 41, 1, 'Scarf', 'Clothes', 25),
(116, 'image-1685558626472.male (1).jpg', '70000.00', 41, 1, 'John Wick Suit', 'Clothes', 5),
(117, 'image-1685558645463.male (2).jpg', '800.00', 41, 1, 'Jeans', 'Clothes', 12),
(118, 'image-1685558659864.male (3).jpg', '200.00', 41, 1, 'Shorts', 'Clothes', 12),
(119, 'image-1685558671672.male (4).jpg', '0.00', 41, 1, 'Tshirt', 'Clothes', 34),
(120, 'image-1685558682929.male (5).jpg', '450.00', 41, 1, 'Lungi', 'Clothes', 121),
(121, 'image-1685558699698.male (6).JPG', '555.00', 41, 1, 'Friends Tshirt', 'Clothes', 25),
(122, 'image-1685558713047.male (7).jpg', '1200.00', 41, 1, 'White Shirt', 'Clothes', 0),
(123, 'image-1685558725119.male (8).jpg', '1550.00', 41, 1, 'Blue Shirt', 'Clothes', 12),
(124, 'image-1685559029543.children (1).jpg', '100.00', 41, 1, 'Product 1', 'Clothes', 12),
(125, 'image-1685559049758.children (9).jpg', '900.00', 41, 1, 'Product 2', 'Clothes', 10),
(126, 'image-1685559069737.children (10).jpg', '390.00', 41, 1, 'Product 3', 'Clothes', 98),
(127, 'image-1685559086183.children (11).jpg', '99.00', 41, 1, 'Product 4', 'Clothes', 21),
(128, 'image-1685559101190.children (12).jpg', '980.00', 41, 1, 'Product 5', 'Clothes', 7),
(129, 'image-1685559121623.children (13).jpg', '0.00', 41, 1, 'Product 6', 'Clothes', 12),
(130, 'image-1685559136799.children (15).jpg', '7.00', 41, 1, 'Product 7', 'Clothes', 12),
(131, 'image-1685559172743.children (14).jpg', '900.00', 41, 1, 'Product 8', 'Clothes', 124),
(132, 'image-1685559188143.children (16).jpg', '222.00', 41, 1, 'Product 9', 'Clothes', 12),
(133, 'image-1685559202023.children (17).jpg', '500.00', 41, 1, 'product 10', 'Clothes', 12),
(135, 'image-1685560106646.perfume (1).jpg', '199.00', 41, 1, 'Product 1', 'Cosmetics', 88),
(136, 'image-1685560118502.perfume (2).jpg', '1991.00', 41, 1, 'Product 2', 'Cosmetics', 12),
(137, 'image-1685560132630.perfume (3).jpg', '929.00', 41, 1, 'Product 3', 'Cosmetics', 22),
(138, 'image-1685560169830.perfume (4).jpg', '919.00', 41, 1, 'Product 4', 'Cosmetics', 77),
(139, 'image-1685560197741.perfume (5).jpg', '919.00', 41, 1, 'Product 5', 'Cosmetics', 24),
(140, 'image-1685560242446.perfume (6).jpg', '77.00', 41, 1, 'Product 6', 'Cosmetics', 7),
(141, 'image-1685560245750.perfume (7).jpg', '88.00', 41, 1, 'Product 7', 'Cosmetics', 0),
(142, 'image-1685560257870.perfume (8).jpg', '99.00', 41, 1, 'Product 8', 'Cosmetics', 12),
(143, 'image-1685560331574.hair (1).jpg', '11.00', 41, 1, 'Product 1', 'Cosmetics', 22),
(144, 'image-1685560339614.hair (2).jpg', '22.00', 41, 1, 'Product 2', 'Cosmetics', 21),
(145, 'image-1685560350077.hair (3).jpg', '33.00', 41, 1, 'Product 3', 'Cosmetics', 2),
(146, 'image-1685560355156.hair (4).jpg', '44.00', 41, 1, 'Product 4', 'Cosmetics', 33),
(147, 'image-1685560358492.hair (5).jpg', '55.00', 41, 1, 'Product 5', 'Cosmetics', 23),
(148, 'image-1685560361796.hair (6).jpg', '66.00', 41, 1, 'Product 6', 'Cosmetics', 23),
(149, 'image-1685560372517.hair (7).jpg', '77.00', 41, 1, 'Product 7', 'Cosmetics', 2),
(150, 'image-1685560486438.makeup (1).jpg', '11.00', 41, 1, 'Product 1', 'Cosmetics', 12),
(151, 'image-1685560495564.makeup (2).jpg', '88.00', 41, 1, 'Product 2', 'Cosmetics', 12),
(152, 'image-1685560505796.makeup (3).jpg', '12.00', 41, 1, 'Product 3', 'Cosmetics', 0),
(153, 'image-1685560522775.makeup (4).jpg', '122.00', 41, 1, 'Product 5', 'Cosmetics', 0),
(154, 'image-1685560535406.makeup (5).jpg', '1222.00', 41, 1, 'Product 5', 'Cosmetics', 12),
(155, 'image-1685560593325.1112fd8e04375cff82a2e2c4aaf8774a--top-skin-care-products-mens-products.jpg', '199.00', 41, 1, 'Product 1', 'Cosmetics', 99),
(156, 'image-1685560615756.2.jpg', '100.00', 41, 1, 'Product 2', 'Cosmetics', 99),
(157, 'image-1685560636950.1.jpg', '849.00', 41, 1, 'Product 3', 'Cosmetics', 0),
(158, 'image-1685560655948.skin (1).jpg', '11.00', 41, 1, 'Product 1', 'Cosmetics', 91),
(159, 'image-1685560668564.skin (5).jpg', '91.00', 41, 1, 'Product 2', 'Cosmetics', 892),
(160, 'image-1685560678991.skin (6).jpg', '981.00', 41, 1, 'Product 3', 'Cosmetics', 8929),
(161, 'image-1685560694965.skin (7).jpg', '222.00', 41, 1, 'Product 4', 'Cosmetics', 0),
(162, 'image-1685560712717.skin (8).jpg', '1112.00', 41, 1, 'Random', 'Cosmetics', 0),
(163, 'image-1685560725349.skin (9).jpg', '124.00', 41, 1, 'Random', 'Cosmetics', 12),
(164, 'image-1685560986093.1 (1).jpg', '11.00', 41, 1, 'Product 1', 'Furnitures', 11),
(165, 'image-1685560990243.1 (3).jpg', '22.00', 41, 1, 'Product 2', 'Furnitures', 11),
(166, 'image-1685560999549.1 (4).jpg', '33.00', 41, 1, 'Product 3', 'Furnitures', 44),
(167, 'image-1685561007980.1 (5).jpg', '44.00', 41, 1, 'Product 4', 'Furnitures', 0),
(168, 'image-1685561016636.1 (6).jpg', '55.00', 41, 1, 'Product 5', 'Furnitures', 55),
(169, 'image-1685561021556.1 (7).jpg', '66.00', 41, 1, 'Product 6', 'Furnitures', 5),
(170, 'image-1685561025748.1 (8).jpg', '77.00', 41, 1, 'Product 7', 'Furnitures', 10),
(171, 'image-1685561116605.1 (1).jpg', '11.00', 41, 1, 'Product 1', 'Furnitures', 44),
(172, 'image-1685561130228.1 (3).jpg', '78.00', 41, 1, 'Product 2', 'Furnitures', 45),
(173, 'image-1685561142483.1 (4).jpg', '12.00', 41, 1, 'Product 3', 'Furnitures', 0),
(174, 'image-1685561156165.1 (5).jpg', '122.00', 41, 1, 'Product 4', 'Furnitures', 12),
(175, 'image-1685561177708.1 (6).jpg', '1222.00', 41, 1, 'Product 5', 'Furnitures', 12),
(176, 'image-1685561190595.1 (7).jpg', '9100.00', 41, 1, 'Product 6', 'Furnitures', 55),
(177, 'image-1685561202627.1 (8).jpg', '90000.00', 41, 1, 'Product 7', 'Furnitures', 12),
(178, 'image-1685561596192.1 (1).jpg', '11.00', 41, 1, 'Random', 'Furnitures', 1),
(179, 'image-1685561606764.1 (2).jpg', '22.00', 41, 1, 'Random 2', 'Furnitures', 12),
(180, 'image-1685561615988.1 (3).jpg', '1225.00', 41, 1, 'Random 3', 'Furnitures', 23),
(181, 'image-1685561625524.1 (4).jpg', '1234.00', 41, 1, 'Random 4', 'Furnitures', 21),
(182, 'image-1685561970367.1 (5).jpg', '0.00', 41, 1, 'Random 5', 'Furnitures', 12),
(183, 'image-1685561981475.1 (6).jpg', '122.00', 41, 1, 'Random  6', 'Furnitures', 0),
(184, 'image-1685561991890.1 (7).jpg', '777.00', 41, 1, 'Random  7', 'Furnitures', 0),
(185, 'image-1685562421295.1 (1).jpg', '0.00', 41, 1, 'Random', 'Furnitures', 12),
(186, 'image-1685562436707.1 (2).jpg', '22.00', 41, 1, 'Random 1', 'Furnitures', 3),
(187, 'image-1685562446506.1 (3).jpg', '1222.00', 41, 1, 'Random 3', 'Furnitures', 1),
(188, 'image-1685897820878.41gr3r3FSWL.jpg', '190.00', 42, 1, 'Book 1', 'Books', 188),
(189, 'image-1685897835836.41KKCQhhAWL._AC_SX368_.jpg', '280.00', 42, 1, 'Book 2', 'Books', 89),
(190, 'image-1685897947867.51DEUWef5ZL._AC_SX368_.jpg', '750.00', 42, 1, 'Book 3', 'Books', 75),
(191, 'image-1685897965930.51FrExyQ6sL._AC_SX368_.jpg', '300.00', 42, 1, 'Book 4', 'Books', 18),
(192, 'image-1685897988363.books (1).jpg', '800.00', 42, 1, 'Book 5', 'Books', 19),
(193, 'image-1685898002796.books (2).jpg', '1009.00', 42, 1, 'Book 6', 'Books', 199),
(194, 'image-1685898066891.books (3).jpg', '870.00', 42, 1, 'Book 7', 'Books', 205),
(195, 'image-1685898085108.books (4).jpg', '999.00', 42, 1, 'Random', 'Books', 50),
(196, 'image-1685898218891.horror (1).jpg', '1880.00', 42, 1, 'Book 1', 'Books', 199),
(197, 'image-1685898234075.horror (2).jpg', '500.00', 42, 1, 'Book 2', 'Books', 8),
(198, 'image-1685898280371.horror (3).jpg', '899.00', 42, 1, 'Book 3', 'Books', 45),
(199, 'image-1685898330651.horror (4).jpg', '555.00', 42, 1, 'Book 4', 'Books', 465),
(200, 'image-1685898538642.horror (5).jpg', '565.00', 42, 1, 'Random', 'Books', 199),
(201, 'image-1685898559570.horror (6).jpg', '898.00', 42, 1, 'Book Random', 'Books', 565),
(202, 'image-1685898585779.horror (7).jpg', '888.00', 42, 1, 'Pet Sematary', 'Books', 565),
(203, 'image-1685898737164.1 (1).jpg', '121.00', 42, 1, 'Romantic 1', 'Books', 100),
(204, 'image-1685898794683.1 (2).jpg', '999.00', 42, 1, 'Romantic 2', 'Books', 55),
(205, 'image-1685898813379.1 (3).jpg', '888.00', 42, 1, 'Romantic 3', 'Books', 58),
(206, 'image-1685898832203.1 (4).jpg', '999.00', 42, 1, 'Romantic 4', 'Books', 77),
(207, 'image-1685898911275.1 (5).jpg', '1200.00', 42, 1, 'Romantic 5', 'Books', 77),
(208, 'image-1685898929193.1 (6).jpg', '888.00', 42, 1, 'Romantic 6', 'Books', 97),
(209, 'image-1685898945378.1 (7).jpg', '981.00', 42, 1, 'Romantic 7', 'Books', 12),
(210, 'image-1685899155747.1 (1).jpg', '700.00', 42, 1, 'Fantasy 1', 'Books', 122),
(211, 'image-1685899169408.1 (2).jpg', '1500.00', 42, 1, 'Fantasy 2', 'Books', 78),
(212, 'image-1685899190314.1 (3).jpg', '0.00', 42, 1, 'Fantasy 3 SET', 'Books', 54),
(213, 'image-1685899215651.1 (3).jpg', '6000.00', 42, 1, 'Fantasy 3 SET', 'Books', 15),
(214, 'image-1685899230641.1 (4).jpg', '565.00', 42, 1, 'Poppy war', 'Books', 45),
(215, 'image-1685899243529.1 (5).jpg', '700.00', 42, 1, 'Six of crows', 'Books', 198),
(216, 'image-1685899256674.1 (7).jpg', '780.00', 42, 1, 'Shadow and bone', 'Books', 45),
(217, 'image-1685899273116.1 (1).jpg', '455.00', 42, 1, 'Children 1', 'Books', 74),
(218, 'image-1685899286865.1 (2).jpg', '777.00', 42, 1, 'Children 2', 'Books', 45),
(219, 'image-1685899306968.1 (3).jpg', '190.00', 42, 1, 'Children 3', 'Books', 15),
(220, 'image-1685899326936.1 (4).jpg', '500.00', 42, 1, 'Children 4', 'Books', 79),
(221, 'image-1685899458249.1 (1).jpg', '7888.00', 42, 1, 'Office 1', 'Electronics', 55),
(222, 'image-1685899473473.1 (2).jpg', '1999.00', 42, 1, 'Office 2', 'Electronics', 25),
(223, 'image-1685899488345.1 (3).jpg', '5000.00', 42, 1, 'Shredder', 'Electronics', 45),
(224, 'image-1685899516073.1 (4).jpg', '15000.00', 42, 1, 'Printer', 'Electronics', 30),
(225, 'image-1685899528392.1 (5).jpg', '500.00', 42, 1, 'Color', 'Electronics', 44),
(226, 'image-1685899584280.a (1).png', '9999.00', 42, 1, 'PC 1', 'Electronics', 65),
(227, 'image-1685899608777.a (1).jpg', '19000.00', 42, 1, 'Pc 2', 'Electronics', 55),
(228, 'image-1685899622625.a (2).JPG', '88199.00', 42, 1, 'Pc 3', 'Electronics', 99),
(229, 'image-1685899635616.a (3).JPG', '5560.00', 42, 1, 'Keyboards', 'Electronics', 40),
(230, 'image-1685899646433.a (4).jpg', '18888.00', 42, 1, 'Processor', 'Electronics', 19),
(231, 'image-1685899663112.a (5).jpg', '120000.00', 42, 1, 'Monitor', 'Electronics', 5),
(232, 'image-1685899680368.a (6).jpg', '75000.00', 42, 1, 'Full setup', 'Electronics', 10),
(234, 'image-1685899758376.1 (1).jpg', '18000.00', 42, 1, 'Laptop 1', 'Electronics', 19),
(235, 'image-1685899774640.1 (2).JPG', '25000.00', 42, 1, 'Laptop 2', 'Electronics', 19),
(236, 'image-1685899790328.1 (3).jpg', '55000.00', 42, 1, 'Laptop 3', 'Electronics', 55),
(237, 'image-1685899804072.1 (4).jpg', '88844.00', 42, 1, 'Laptop 4', 'Electronics', 71),
(238, 'image-1685899848808.others (1).JPG', '56600.00', 42, 1, 'Camera', 'Electronics', 40),
(239, 'image-1685899867487.others (2).JPG', '5555.00', 42, 1, 'Router', 'Electronics', 75),
(240, 'image-1685899882308.others (3).jpg', '7000.00', 42, 1, 'Graphic pad', 'Electronics', 55),
(241, 'image-1685899896367.others (4).jpg', '899.00', 42, 1, 'headphone', 'Electronics', 17),
(242, 'image-1685899950856.51blfb-Cr0S._AC_UF894,1000_QL80_.jpg', '20000.00', 42, 1, 'Smartphone 1', 'Electronics', 19),
(243, 'image-1685899966881.51ISw7jKORL._AC_UF894,1000_QL80_.jpg', '80000.00', 42, 1, 'Smartphone 2', 'Electronics', 7),
(245, 'image-1685899995752.71EPR0Ph5WL._AC_UF894,1000_QL80_.jpg', '15000.00', 42, 1, 'Green phone', 'Electronics', 74),
(246, 'image-1685900157279.51MmY+J0fPL._AC_UL330_SR330,330_.jpg', '8100.00', 42, 1, 'Smartphone 3', 'Electronics', 16);

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
(41, '1', '$2b$10$p420qQfnPnPZeOKNjd.A6.IZl/gmtpZzDwbZzVehHO0Nk7z5WaYTG', 'Mahir', '01710241003', 'image-1685557571862.1.png', 1, 'Seller'),
(42, '2', '$2b$10$RsdnslE994v71ZNtnPbqF.s15RC3Z7Kuqk7TvvlS/07tAwnDxpkvu', 'Megha', '01710481771', 'image-1685557581756.female.png', 1, 'Seller');

-- --------------------------------------------------------

--
-- Table structure for table `warehouse`
--

CREATE TABLE `warehouse` (
  `ID` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Phone` varchar(255) NOT NULL,
  `Image` varchar(255) NOT NULL,
  `AdminID` int(11) NOT NULL,
  `Type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `warehouse`
--

INSERT INTO `warehouse` (`ID`, `Username`, `Password`, `Name`, `Phone`, `Image`, `AdminID`, `Type`) VALUES
(3, '1', '$2b$10$Wpv2dCoscqN0KuikI4Rl2OMinn1330Kn1aiJG.SInwRYMMCpZURXy', 'Hub 1', '01919824835', 'image-1685355421040.1.png', 1, 'Warehouse');

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
-- Indexes for table `furnitures`
--
ALTER TABLE `furnitures`
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
-- Indexes for table `warehouse`
--
ALTER TABLE `warehouse`
  ADD PRIMARY KEY (`ID`);

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `clothes`
--
ALTER TABLE `clothes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `cosmetics`
--
ALTER TABLE `cosmetics`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `discounts`
--
ALTER TABLE `discounts`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `electronics`
--
ALTER TABLE `electronics`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `furnitures`
--
ALTER TABLE `furnitures`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=247;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `sellers`
--
ALTER TABLE `sellers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `warehouse`
--
ALTER TABLE `warehouse`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
-- Constraints for table `furnitures`
--
ALTER TABLE `furnitures`
  ADD CONSTRAINT `furnitures_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ID`) ON DELETE CASCADE;

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
