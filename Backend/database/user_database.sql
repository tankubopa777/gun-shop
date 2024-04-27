use db;

CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    passwd VARCHAR(255),
    is_admin BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT FALSE
);
INSERT INTO users (id, email, passwd, is_admin, is_active) 
VALUES 
    ('root', 'admin@test.com', '$2b$12$p2E5Z2i2YkkXl0QjEeoO4Ot5O6Eq0yze7UPXjvs6k9b6MCdVC0QaO', 1, 1);


CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255),
    product_type VARCHAR(255),
    product_description VARCHAR(255),
    product_image VARCHAR(255),
    product_price FLOAT DEFAULT 0,
    product_quantity INT DEFAULT 0,
    reviews JSON,
    saled INT DEFAULT 0,
    reviews_quantity INT DEFAULT 0,
    positive INT DEFAULT 0,
    negative INT DEFAULT 0
);

CREATE TABLE orders (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    product_name VARCHAR(255),
    product_type VARCHAR(255),
    product_price FLOAT DEFAULT 0,
    order_quantity INT DEFAULT 0,
    username VARCHAR(255),
    customer_name VARCHAR(255),
    user_address VARCHAR(255),
    user_phone VARCHAR(255)
);

CREATE TABLE basket (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    product_name VARCHAR(255),
    product_type VARCHAR(255),
    product_price FLOAT DEFAULT 0,
    order_quantity INT DEFAULT 0,
    username VARCHAR(255)
);

INSERT INTO products (product_name, product_type, product_description, product_price, product_quantity)
VALUES
  ('Vanguard Viper XR Tactical Rifle', 'Tactical Rifle', 'Engineered for ultimate precision, this tactical rifle features a 20-inch stainless steel barrel, fully adjustable stock, and modular accessory rail system. Ideal for serious shooters in competitive or tactical scenarios.', 1200, 10),
  ('Sentinel Striker 308', 'Tactical Rifle', 'Sharpshooter''s choice with a 22-inch carbon fiber barrel, adjustable stock for tailored shooting styles, and lightweight design for better accuracy in long-range engagements.', 1450, 8),
  ('Blackhawk Recon A7', 'Tactical Rifle', 'Stealth optimized with an integrated suppressor, enhanced recoil system for accuracy during rapid fire, and robust design for tactical missions.', 1700, 5),
  ('Falcon Marksman X1', 'Tactical Rifle', 'High-caliber, long-range tactical rifle with a sturdy bipod, long precision barrel, and durable construction for rugged outdoor use.', 1650, 6),
  ('Predator Tactical Elite', 'Tactical Rifle', 'Combines robust construction with rapid-fire capability, ideal for competitive shooting and personal defense.', 1300, 12),
  ('Nightshade SBR 556', 'Tactical Rifle', 'Compact, highly maneuverable tactical rifle with a short barrel and collapsible stock, perfect for urban combat scenarios.', 1100, 15),
  ('Paladin Patrol Carbine', 'Tactical Rifle', 'Versatile and reliable under harsh conditions with a weather-resistant coating and a reliable gas-operated system.', 950, 20),
  ('Omega Operator MK2', 'Tactical Rifle', 'Optics ready, smooth trigger pull, reinforced barrel, and ergonomic design make it ideal for law enforcement and security operations.', 1200, 10),
  ('Phantom Recon 762', 'Tactical Rifle', 'Designed for sustained engagements with a high-capacity magazine and durable build, ideal for defensive roles.', 1250, 7),
  ('Arctic Warfare Suppressor Rifle', 'Tactical Rifle', 'Crafted for operations in cold environments with superior thermal performance and materials resistant to freezing.', 1800, 4),
  -- Handguns
  ('Cobra Compact 9mm', 'Handgun', 'Functional and compact, designed for concealed carry with a high-strength polymer frame, stainless steel slide, and integrated laser sight.', 750, 30),
  ('Titan Defender .45 ACP', 'Handgun', 'Powerful and rugged .45 ACP handgun with high stopping power, ergonomic grips, and low recoil.', 850, 25),
  ('Quantum Quickdraw Revolver', 'Handgun', 'Features a fast-loading swing-out cylinder, enhanced ergonomic handle, and a blend of classic aesthetics with modern engineering.', 600, 18),
  ('Eclipse Elite 10mm Auto', 'Handgun', 'Hunters and tactical shooters choice with superior ballistics, custom grip, and high-capacity magazine.', 800, 22),
  ('Vortex Venom 9mm', 'Handgun', 'Lightweight, high-capacity, and designed for competitive shooting with enhanced sights and balanced frame.', 650, 40),
  ('Paladin Pocket .380 ACP', 'Handgun', 'Ultra-compact and stealthy, ideal for backup protection with reliable performance.', 550, 35),
  ('Shadow Strike 45 Compact', 'Handgun', 'Stealth finish, smooth action, and compact design tailored for covert operations and special forces.', 900, 12),
  ('Razorback 10mm Longslide', 'Handgun', 'Long barrel for precision, well-balanced for sport shooting and hunting applications.', 950, 15),
  ('Firehawk 9mm Tactical', 'Handgun', 'Tactical upgrades with enhanced sights, tactical rail, and modified grip for better control.', 700, 20),
  ('Silverline 38 Special Snub', 'Handgun', 'Classic design with modern safety features, ideal for new shooters with enhanced safety and snub-nose design.', 500, 25),
  -- Shotguns
  ('Thunderbolt 12-Gauge', 'Shotgun', 'Pump-action, high-capacity, and all-weather rugged synthetic stock makes it versatile for hunting and home defense.', 350, 15),
  ('Cyclone Tactical Breacher', 'Shotgun', 'Short barrel, designed for tactical entry and door breaching with a reinforced breech end.', 450, 10),
  ('Maverick Field Hunter', 'Shotgun', 'Over-under shotgun perfect for game hunting with finely balanced barrels and beautiful wooden stock.', 600, 12),
  ('Sentinel Automatic 20-Gauge', 'Shotgun', 'Lightweight semi-automatic, great for sporting clays and bird hunting with smooth cycling and reduced recoil.', 650, 20),
  ('Nightwatch Home Defender', 'Shotgun', 'Integrated flashlight, short barrel, and designed for home security with reliable pump-action performance.', 400, 18),
  ('Viper Strike Side-by-Side', 'Shotgun', 'Double-barrel, reliable under extreme conditions with a classic configuration and rugged build.', 550, 8),
  ('Hawk Precision Slug Gun', 'Shotgun', 'Rifled barrel for enhanced accuracy with slugs, ideal for big game hunting.', 700, 10),
  ('Falcon Tactical 12-Gauge', 'Shotgun', 'Adjustable stock, Picatinny rail, and robust construction for versatile tactical use.', 500, 15),
  ('Ranger Overland 410', 'Shotgun', 'Small gauge, easy handling, ideal for young or novice shooters with light recoil.', 450, 25),
  ('Reaper Mag-Fed 12-Gauge', 'Shotgun', 'Magazine-fed for quick reloads and high-intensity shooting sessions.', 750, 7),
  -- Accessories
  ('LaserMax Guide Rod Laser', 'Accessory', 'Internal laser aiming device replacing standard guide rod, enhancing accuracy and confidence in close-quarters.', 200, 50),
  ('Ghost Tactical Flashlight', 'Accessory', 'High-lumen flashlight mountable on any firearm with a standard rail, providing bright illumination.', 120, 40),
  ('Viper Red Dot Sight', 'Accessory', 'Compact red dot sight enhancing accuracy with fast target acquisition and a wide field of view.', 220, 30),
  ('Falcon Bipod', 'Accessory', 'Sturdy, adjustable bipod for precision shooting on uneven terrain.', 150, 25),
  ('Titan Extended Magazine', 'Accessory', 'Increases ammunition capacity for tactical rifles, allowing for longer firing sessions.', 80, 60),
  ('Cobra Grip Enhancer', 'Accessory', 'Non-slip grip enhancer for improved grip and control under adverse conditions.', 50, 70),
  ('Sentinel Shooting Glasses', 'Accessory', 'Protective eyewear with high-impact resistance and UV protection, essential for safety and clear vision.', 75, 40),
  ('Ranger Hearing Protection', 'Accessory', 'Advanced noise reduction earmuffs that are adjustable and padded for comfortable, extended use.', 65, 35),
  ('Phantom Gun Cleaning Kit', 'Accessory', 'Comprehensive cleaning kit with all essential tools for maintaining firearm performance and longevity.', 90, 45),
  ('Apex Tactical Sling', 'Accessory', 'Multi-position tactical sling made from durable materials, enhancing mobility and stability during shooting.', 70, 50);
