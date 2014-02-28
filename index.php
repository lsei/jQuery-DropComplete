<html>
	<head>

		<link rel="stylesheet" href="style.css">

		<script type="text/javascript" src="js/jquery.min.js"></script>
		<script type="text/javascript" src="dropcomplete.js"></script>
		<script type="text/javascript" src="script.js"></script>

	</head>

	<body>
		<form action="">
			<div class="form-element">
				<?php $time = date('U'); ?>
				<input placeholder="Start typing..." type="text" data-type="dropcomplete" data-element="categories" id="category" name="category-<?php echo $time; ?>" data-url="categories.php"> <div class="btn btn-add">+</div> <div class="trigger-dropdown">\/</div>
			</div>

			

			<div class="form-element">
				<?php $time = date('U'); ?>
				<input placeholder="Start typing..." type="text" data-type="dropcomplete" data-element="stores" id="store" name="store-<?php echo $time; ?>" data-url="regions.php"> <div class="btn btn-add">+</div> <div class="trigger-dropdown">\/</div>
			</div>

			

			<div class="form-element">
				<?php $time = date('U'); ?>
				<input placeholder="Start typing..." type="text" data-type="dropcomplete" data-element="regions" id="region" name="region-<?php echo $time; ?>" data-url="url"> <div class="btn btn-add">+</div>
			</div>
		</form>

		<div class="modal-wrapper">
			<div class="modal">
				<div class="modal-title">
					
				</div>
				<div class="modal-content">
					
				</div>
			</div>
		</div>
	</body>
</html>
