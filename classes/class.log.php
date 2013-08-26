<?php

/**
 *
 *
 * @version $Id$
 * @copyright 2008
 */

/**
 *
 *
 */
class Log {
	var $filename = "";
	var $content = "";
	/**
	 * Constructor
	 * @access protected
	 */
	function Log($filename){
		$this->filename = $filename;
	}

	function log_to_file ($content,$datum_kell = 1) {
		if ($datum_kell == 1) {
			$content = date("Y-m-d H:i:s") . ": " . $content;
		}

		$content .= "\n";

	    if (!$handle = fopen($this->filename, 'a')) {
    	     //echo "Cannot open file ($filename)";
	         //exit;
	         return false;
	    } else {
		    // Write $somecontent to our opened file.
		    if (fwrite($handle, $content) === FALSE) {
		    	return false;
		    }

		    //echo "Success, wrote ($content) to file ($filename)";
	    	fclose($handle);
		}
	}




}


?>