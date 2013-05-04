
<script src="{$resources_dir}jquery.min.js"></script>
<script src="{$resources_dir}js/bootstrap.min.js"></script>
{foreach from=$clients_js item=client_js}
    <script src="{$client_js}"></script>
{/foreach}
<script src="{$resources_dir}OpenM-Book/gui/js/CommonController.js"></script>
<script src="{$resources_dir}OpenM-Book/gui/js/community/CommunityController.js"></script>
<script src="{$resources_dir}OpenM-Book/gui/js/community/CommunityGUI.js"></script>
<script src="{$resources_dir}OpenM-Book/gui/js/community/CommunityDAO.js"></script>
<script src="{$resources_dir}OpenM-Book/gui/js/user/UserDAO.js"></script>